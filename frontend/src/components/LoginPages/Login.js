import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addToLocal, addToLocalToken } from '../../localStorage'

const Login = ({setMeta,setInfo}) => {
  const [user, setUser] = useState({
    email: null,
    password: null
  })
  const navigate = useNavigate()

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()

    const result = await fetch(`api/user/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:user.email,
        password:user.password
      })
    })
    const ans = await result.json()
    if(ans.success){
      addToLocal(ans.user._id)
      addToLocalToken(ans.token)
      navigate('/home')
    }
    setInfo(true)
    setMeta({
      success:ans.success,
      message:ans.message
    })
  }
  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <div className='login-part'>
          <input
            type='text'
            value={user.email}
            onChange={(e) => handleInputs(e)}
            placeholder='Enter Your Email'
            className='login-input'
            name='email'/>
        </div>
        <div className='login-part'>
          <input
            type='password'
            value={user.password}
            onChange={(e) => handleInputs(e)}
            placeholder='Password'
            className='login-input'
            name='password'/>
        </div>

        <div className='login-btn'>
          <button type='submit' id='login-btn'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login