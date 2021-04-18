const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const newBlog = new Blog(request.body);

  try {
    const savedBlog = await newBlog.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
});

module.exports = blogsRouter;
