import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {

    }
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

  const blogList = () => (
    <>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )

  return (
    <div>
      {user ?
        blogList() :
        loginForm()
      }
    </div>
  )
}

export default App