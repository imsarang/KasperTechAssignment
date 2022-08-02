import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = ({ setLogin ,setMeta,setInfo}) => {
  const [user, setUser] = useState({
    name: null,
    email: null,
    password: null,
    cpassword: null,
    role: null
  })
  const navigate = useNavigate()

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
      const result = await fetch(`/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
          cpassword:user.cpassword
        })
      })

      const ans = await result.json()
      if (ans.success) {
        setLogin(true)
      }
      setInfo(true)
      setMeta({
        success:ans.success,
        message:ans.message
      })
  }
  return (
    <div className='register'>
      <form onSubmit={handleSubmit}>
        <div className='register-part'>
          <input
            type='text'
            value={user.name}
            onChange={(e) => handleInputs(e)}
            name='name'
            placeholder='Enter Name'
            className='register-input'
          />
        </div>
        <div className='regiter-part'>
          <input
            type='email'
            value={user.email}
            onChange={(e) => handleInputs(e)}
            name='email'
            placeholder='Enter Email'
            className='register-input'
          />
        </div>
        <div className='regiter-part'>
          <input
            type='password'
            value={user.password}
            onChange={(e) => handleInputs(e)}
            name='password'
            placeholder='Enter Password'
            className='register-input'
          />
        </div>
        <div className='regiter-part'>
          <input
            type='password'
            value={user.cpassword}
            onChange={(e) => handleInputs(e)}
            name='cpassword'
            placeholder='Confirm Password'
            className='register-input'
          />
        </div>

        <div className='register-btn'>
          <button id='register-btn'>Register</button>
        </div>
      </form>
    </div>
  )
}

export default Register