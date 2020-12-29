import React, { useState } from 'react'
const Blog = ({ blog, likeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [buttonName, setButtonName] = useState('view')

  const showWhenVisible = {display : visible ? '' : 'none'} 

  const toggleVisible = () => {
    setVisible(!visible)
    visible ? setButtonName('show') : setButtonName('hide')
  }

  const handleLike = () => {
    const changedBlog = {
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      user: blog.user,
      id: blog.id
    }

    likeBlog(changedBlog)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisible}>{buttonName}</button>
      <div style={showWhenVisible}>
        {blog.url}
        <br/>
        likes {blog.likes}
        <button onClick={handleLike}>like</button>
        <br/>
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog
