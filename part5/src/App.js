import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
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

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        username
        <input
          type='text'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        password
        <input
          type='password'
          name="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type='submit'>Log in</button>
      </form>
    </div>
  )

  const handleCreateNew = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: title,
        url: url,
        author: author
      }

      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setUrl('')
      setAuthor('')
      setTitle('')
      setMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {setMessage('')}, 5000)
    }
    catch (exception) {
      setMessage(exception)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const createNew = () => (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreateNew}>
        title:
      <input
          type='text'
          name='Title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br></br>
      author:
      <input
          type='text'
          name='Author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br></br>
      url:
      <input
          type='text'
          name='Url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br></br>
        <button type='submit'>create</button>
      </form>
    </>
  )

  const blogList = () => (
    <>
      <h2>blogs</h2>
      {user.name} logged in       <button onClick={handleLogout}>log out</button>
      {createNew()}


      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )



  return (
    <div>
      <Notification message={message} />
      {user ?
        blogList() :
        loginForm()
      }
    </div>
  )
}

export default App