const Blog = require("../models/blog");

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
  const blogs = await Blog.find({});

  return blogs.map((b) => b.toJSON());
};

const validNonexistingId = async () => {
    const invisibleBlog = {
        title: 'invisible title',
        author: 'inisible man',
        url: 'www.invisible.com',
        likes: 0

    }
    const blog = new Blog(invisibleBlog)
    await blog.save()
    await blog.remove()

    return blog._id.toString()
};

module.exports = {
  blogsInDb,
  initialBlogs,
  validNonexistingId
};
