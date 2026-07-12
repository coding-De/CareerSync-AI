import axios from 'axios'
import React from 'react'
import { NavLink, useNavigate } from 'react-router'

function LoginPage() {
  const navigate = useNavigate()

  const handelform = (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    axios.post(`${import.meta.env.VITE_SERVICE_PATH}auth/login`, { email: username, password }, {
      withCredentials: true
    }).then((res) => {
      if (res.data) {
        localStorage.setItem('token', res.data.token)
        navigate('/')
      }
    }).catch((err) => {
      console.error('Login failed:', err)
    })
  }
  return (
    <div>
      <div className="login">
        <h4>Login</h4>
        <form onSubmit={handelform}>
          <div className="text_area">
            <input
              type="text"
              id="username"
              name="username"
              defaultValue="username"
              className="text_input"

            />
          </div>
          <div className="text_area">
            <input
              type="password"
              id="password"
              name="password"
              defaultValue="password"
              className="text_input"

            />
          </div>
          <input
            type="submit"
            value="LOGIN"
            className="btn"

          />
        <NavLink className="link" to="/register"> Don't have an account? Sign Up</NavLink>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
