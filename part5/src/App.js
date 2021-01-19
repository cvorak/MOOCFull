import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState('')

  const blogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const userJson = window.localStorage.getItem('loggedInUser')
    if (userJson) {
      const user = JSON.parse(userJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userToLogIn) => {
    try {
      const user = await loginService.login(userToLogIn)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      
    }
    catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  const handleCreateNew = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      blogRef.current.toggleVisibility()
      setBlogs(blogs.concat(returnedBlog))

      setMessage(`a new blog added`)
      setTimeout(() => {setMessage('')}, 5000)
    }
    catch (exception) {
      setMessage(exception)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (changedBlog) => {
    const returnedBlog = await blogService.update(changedBlog)
    returnedBlog.user = changedBlog.user
    const updatedBlogs = blogs.map(blog => {
      if (blog.id !== returnedBlog.id)
        return blog
      else 
        return returnedBlog
    })

    setBlogs(updatedBlogs)
  }

  const removeBlog = async (id) => {
    await blogService.remove(id)
    const updatedBlogs = blogs.filter(blog => blog.id !== id)
    setBlogs(updatedBlogs)
  }

  const blogList = () => (
    <>
      <h2>blogs</h2>
      {user.name} logged in 
      <button id='logout' onClick={handleLogout}>log out</button>
      <Togglable ref={blogRef} buttonName={'add new blog'}>
        <BlogForm saveNewBlog={handleCreateNew} />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
        <Blog key={blog.id} blog={blog} 
          likeBlog={handleLike}
          removeBlog={removeBlog}
        />
      )}
    </>
  )



  return (
    <div>
      <Notification message={message} />
      {user ?
        blogList() :
        <LoginForm logUserIn={handleLogin} />
      }
    </div>
  )
}

export default App