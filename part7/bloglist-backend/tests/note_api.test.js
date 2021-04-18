const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("../tests/test_helper")
const Blog = require("../models/blog");


beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(2);
});

test("the first blog is about HTTP methods", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].title).toBe("First test blog");
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Third test blog",
    author: "Cvox",
    url: "www.post_test.com",
    likes: 0,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('Third test blog')

});

test('blog without title is not added', async() => {
  const newBlog = {
    author: 'Cvo',
    url: 'www.cv.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier of the blog post is named id', async () => {
  const blogsInDb = await helper.blogsInDb()

  expect(blogsInDb[0].id).toBeDefined()
})

test('if likes prop is missing from the request, it defaults to 0', async () => {
  const newBlog = {
    author: 'cvorak',
    url: 'www.testing.com',
    title: 'test title'
  }

  await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const savedBlog = blogsAtEnd.find(b => b.url === 'www.testing.com')

  expect(savedBlog.likes).toBeDefined()
  expect(savedBlog.likes).toBe(0)
})

test('if title is missing, response is Bad Request(400)', async () => {
  const newBlogWithoutTitle = {
    author: 'cvorek',
    url: 'www.tralala.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  console.log(blogsAtEnd)

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('if url is missing, response is Bad Request(400)', async () => {
  const newBlogWithoutUrl = {
    author: 'cvorek',
    title: 'example title'
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutUrl)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close();
});
