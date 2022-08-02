import React, { useEffect, useState } from 'react'
import "../styles/navbar.css"
import { FaBars } from 'react-icons/fa'
import { returnToken } from '../../localStorage'
import { NavLink, useNavigate } from 'react-router-dom'
const Navbar = ({ user}) => {

  const token = JSON.parse(returnToken())
  const navigate = useNavigate()
  useEffect(()=>{
    console.log(user);
  },[])
  const handleLogout = async () => {
    const result = await fetch(`/api/user/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const ans = await result.json()
    if (ans.success) {
      navigate('/')
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
    }
  }
  const handleRemoveAccount =async()=>{
    const result = await fetch(`/api/user/remove`,{
      method:"DELETE",
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    localStorage.removeItem("userId")
    localStorage.removeItem("token")
    navigate('/')
  }
  return (
    <div className='navbar'>
      <div className='bars'>
        <div className='brand'>
          <NavLink to='/home' style={{textDecoration:'none',color:'white',border:'none',cursor:'pointer'}}>
            KasperTech
          </NavLink>
        </div>
      </div>
      <div id='welcome'>Welcome {user.name} {user.role=='Admin'?<>/Admin</>:<></>}</div>
      <div className='nav-content'>
        <div className='logout' onClick={handleLogout}>
          Logout
        </div>
        <div className='remove-acc' onClick={handleRemoveAccount}>
          Remove Account
        </div>
      </div>
    </div>
  )
}

export default Navbar