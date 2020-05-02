const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObject = helper.initialBlogs.map(b => Blog(b))
    const promiseArray = blogObject.map(b => b.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(b => b.title)

    expect(titles).toContain('TDD harms architecture')
})

test('unique identifier property of blog is id', async() => {
    const response = await api.get('/api/blogs')

    const blog = response.body[0]

    expect(blog.id).toBeDefined()
})

test('a blog can be added', async () => {
    const newBlog = {
        title: "Test Title", 
        author: "Test Author", 
        url: "http://blog.testauthor.com/testtitle.html", 
        likes: 6 
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('Test Title')
})

test('when likes is missing from blog it defaults to zero', async () => {
    const blogWithMissingLikes = {
        title: 'Test Title',
        author: 'Test Author',
        url: "http://blog.testauthor.com/testtitle"
    }

    await api
        .post('/api/blogs')
        .send(blogWithMissingLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blogWithDefaultedLikes = blogsAtEnd.filter(b => b.title === 'Test Title')
    expect(blogWithDefaultedLikes[0].likes).toBe(0)
})

test('if title and url are missing from blog bad request is returned', async () => {
    const blogWithoutUrlAndTitle = {
        author: 'Test Author'
    }

    await api
        .post('/api/blogs')
        .send(blogWithoutUrlAndTitle)
        .expect(400)
        .expect('Content-Type', /application\/json/)
})


afterAll(() => {
    mongoose.connection.close()
})