import React, { useState } from 'react'
const Blog = ({ blog, likeBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [buttonName, setButtonName] = useState('view')

  const showWhenVisible = { display: visible ? '' : 'none' }

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

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      removeBlog(blog.id)
  }

  return (
    <div style={blogStyle}>
      <div className='titleAuthor'>
        {blog.title} {blog.author}
      </div>
      <button onClick={toggleVisible} className='toggleButton'>{buttonName}</button>
      <div style={showWhenVisible} className='urlLikes'>
        {blog.url}
        <br />
        likes {blog.likes}
        <button onClick={handleLike} className='likeButton'>like</button>
        <br />
        {blog.user.name}
        <br />
        <button id='remove' onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
}

export default Blog
