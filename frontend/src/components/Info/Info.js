import React, { useEffect, useState } from 'react'
import '../styles/info.css'
const Info = ({success,message,setInfo}) => {
    const [seconds,setSeconds] = useState(4)

    useEffect(()=>{
        const timer = setInterval(()=>{
            if(seconds>0) setSeconds(seconds-1)
            if(seconds==0) {
                setSeconds(0)
                setInfo(false)
            }
        },1000)
        return ()=>clearInterval(timer)
    },[seconds])
  return (
    <>
    {
        success?<div className='success'>
            {message}
        </div>:<div className='failure'> 
            {message}
        </div>
    }
    </>
    
  )
}

export default Info