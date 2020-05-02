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


afterAll(() => {
    mongoose.connection.close()
})