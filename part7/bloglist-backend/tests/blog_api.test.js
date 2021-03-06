const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper")
const api = supertest(app);

const Blog = require("../models/blog");
const blogsRouter = require("../controllers/blogs");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs)
});

describe('when there are initialy two blogs saved', () => {
  test('their unique identifier is named id', async () => {
    const blogsInDb = await helper.blogsInDb()
  
    expect(blogsInDb[0].id).toBeDefined()
  })

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
})

describe('addition of a new blog', () => {
  test("succeeds with valid data", async () => {
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

  test('fails with Bad Request(400), if title is missing', async () => {
    const newBlogWithoutTitle = {
      author: 'cvorek',
      url: 'www.tralala.com'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitle)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
  
  test('fails with Bad Request(400), if URL is missing', async () => {
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

  test('when likes prop is missing from the request, defaults it to 0', async () => {
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
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.validNonexistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })
})

describe('deleting a blog', () => {
  test('succeeds with a valid id', async () => {
    let blogsInDb = await helper.blogsInDb()
    const lengthOnStart = blogsInDb.length
    const blogToDelete = blogsInDb[0]

    const id = blogToDelete.id

    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)

    blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(lengthOnStart - 1)
    const titles = blogsInDb.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('returns 204 for an invalid id', async () => {
    let blogsInDb = await helper.blogsInDb()
    const lengthAtStart = blogsInDb.length
    const id = await helper.validNonexistingId()
    
    await api
    .delete(`/api/blogs/${id}`)
    .expect(204)
    
    blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(lengthAtStart)
  })
})

describe('updating a blog', () => {
  test('succeeds with a valid id', async () => {
    let blogsInDb = await helper.blogsInDb()
    const blogToUpdate = blogsInDb[0]
    const id = blogToUpdate.id
    blogToUpdate.title = 'This is an updated title!'

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(204)

    
    blogsInDb = await helper.blogsInDb()
    const updatedBlog = blogsInDb.filter(b => b.id === id)[0]

    expect(updatedBlog.title).toEqual(blogToUpdate.title)
  })

  test('returns 204 with invalid id', async () => {
    let blogsInDb = await helper.blogsInDb()
    const titlesAtStart = blogsInDb.map(b => b.title)
    const validId = await helper.validNonexistingId()
    const blogToUpdate = blogsInDb[0]
    blogToUpdate.title = 'This is an updated title!'

    await api
      .put(`/api/blogs/${validId}`)
      .send(blogToUpdate)
      .expect(204)

    blogsInDb = await helper.blogsInDb()
    const titlesAtEnd = blogsInDb.map(b => b.title)
    expect(titlesAtStart).toEqual(titlesAtEnd)
  })
})

afterAll(() => {
  mongoose.connection.close();
});
