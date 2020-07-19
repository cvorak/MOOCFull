const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', {username: 1, name: 1})
        
    response.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
    if (!req.body.title && !req.body.url) {
        res.status(400).json( {error: 'url and title missing'})
    } else {
        const body = req.body
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if (!req.token || !decodedToken.id) {
            return res.status(401).json({error: 'token missing or invalid'})
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            likes: body.likes,
            author: body.author,
            url: body.url,
            user: user._id
        })

        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        res
            .status(201)
            .json(savedBlog.toJSON())
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response
        .status(204)
        .end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter