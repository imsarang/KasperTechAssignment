import React, { useState } from 'react'
import Info from '../Info/Info'

import '../styles/loginPage.css'
import Login from './Login'

import Register from './Register'
const Start = () => {

  const [login,setLogin] = useState(true)
  const [info,setInfo] = useState(false)
  const [meta,setMeta] = useState({
    success:null,
    message:null
  })
  return (
    <div className='start'>
      <div className='bg-1'></div>
      <div className='bg-2'></div>
      <div className='main-box'>
        <div className='main-head'>
          <div className={login?"active":"choice"} onClick={()=>setLogin(true)}>Login</div>
          <div className={!login?"active":"choice"} onClick={()=>setLogin(false)}>Register</div>
        </div>
        <div className='main-content'>
          {
            login?<Login setMeta={setMeta} setInfo={setInfo}/>:<Register setLogin={setLogin} setMeta={setMeta} setInfo={setInfo}/>
          }
        </div>
      </div>
      {
        info?<Info success={meta.success} message={meta.message} setInfo={setInfo}/>:<></>
      }
    </div>
  )
}

export default Start