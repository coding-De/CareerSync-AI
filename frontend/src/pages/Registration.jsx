import axios from 'axios'
import React from 'react'
import { NavLink } from 'react-router'

function Registration() {

  const handelform = (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const email = e.target.email.value
    const password = e.target.password.value
    axios.post(`${import.meta.env.VITE_SERVICE_PATH}auth/resisters`, { username, email, password }, {
      withCredentials: true
    }).then((res) => {
      if (res.data) {
        localStorage.setItem('token', res.data.token)
        navigate('/')
      }
    }).catch((err) => {
      console.error('Registration failed:', err)
    })
  }
  return (
    <div>
       <div>
      <div className="login">
        <h4>Register</h4>
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
              type="text"
              id="email"
              name="email"
              defaultValue="email"
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
            value="REGISTER"
            className="btn"

          />
        <NavLink className="link" to="/login">Already have an account? Login</NavLink>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Registration
