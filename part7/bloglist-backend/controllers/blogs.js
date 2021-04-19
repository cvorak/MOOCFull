const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id) 

  if (!blog) {
    response
      .status(404)
      .send("Blog not found")

    return
  }

  response.json(blog)
})

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

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
