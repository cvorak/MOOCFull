const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blogToSave = request.body

  if (!blogToSave.url || !blogToSave.title) {
    response.status(400).send('Title or URL missing.')
    return
  }

  if (!blogToSave.likes) {
    blogToSave.likes = 0
  }
  
  const newBlog = new Blog(blogToSave);

  try {
    const savedBlog = await newBlog.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
});

module.exports = blogsRouter;
