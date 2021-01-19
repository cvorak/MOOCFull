import React, {useState} from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({logUserIn}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        const user = {username, password}
        logUserIn(user)

        setUsername('')
        setPassword('')
    }

    return (
        <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        username
        <input
          id='username'
          type='text'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        password
        <input
          id='password'
          type='password'
          name="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button id='login' type='submit'>Log in</button>
      </form>
    </div>
    )
}

LoginForm.propTypes = {
    logUserIn: PropTypes.func.isRequired
}

export default LoginForm