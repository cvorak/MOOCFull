const Blog = require("../models/blog")

const initialBlogs = [
    {
      title: "First test blog",
      author: "Cvorak",
      url: "www.test.com",
      likes: 0,
    },
    {
      title: "Second test blog",
      author: "Cvore",
      url: "www.second_test.com",
      likes: 0,
    },
  ];

const blogsInDb = async () => {
    const blogs = await Blog.find({})

    return blogs.map(b => b.toJSON())
}

module.exports = {
    blogsInDb, 
    initialBlogs
}