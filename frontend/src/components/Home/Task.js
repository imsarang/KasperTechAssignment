import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { returnToken } from '../../localStorage'
import Info from '../Info/Info'
import Navbar from './Navbar'

const Task = () => {
    const token = JSON.parse(returnToken())
    const { taskID } = useParams()

    const [task, setTask] = useState({})
    const [user, setUser] = useState({})
    const [load, setLoad] = useState(false)
    const [hours, setHours] = useState(null)
    const [minutes, setMinutes] = useState(null)
    const [day, setDays] = useState(null)
    const [month, setMonths] = useState(null)
    const [year, setYear] = useState(null)
    const [x, setX] = useState(null)
    const [status, setStatus] = useState(null)
    const [show, setShow] = useState(false)
    const [status_id,setStatusId] = useState(null)
    const [currStatus,setCurrStatus] = useState(null)

    const [info,setInfo] = useState(false)
    const [meta,setMeta] = useState({
        success:null,
        message:null
    })

    useEffect(() => {
        showTask()
        showCurrentUser()
    }, [task])

    const showTask = async () => {
        // setLoad(true)
        const result = await fetch(`/api/task/get/${taskID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const ans = await result.json()
        // console.log(ans.task);
        setTask(ans.task)
        const date = new Date(ans.task.statusLogs[ans.task.statusLogs.length - 1].updatedAt)
        const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
        setHours(hours)
        setMinutes(date.getMinutes())
        setX(date.getHours() > 12 ? "PM" : "AM")
        setYear(date.getFullYear())
        setMonths(date.getMonth() + 1)
        setDays(date.getDate())
        setStatus(ans.task.statusLogs[ans.task.statusLogs.length - 1].status)
        setStatusId(ans.task.statusLogs[ans.task.statusLogs.length - 1]._id)
        // setLoad(false)
        

    }
    const showCurrentUser = async () => {
   
        const result = await fetch(`/api/user/current`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const ans = await result.json()
        setUser(ans.user)
        
        
    }
    const handleStatus=async(progress,statusId)=>{
        const result = await fetch(`/api/task/update/${taskID}`,{
            method:"PUT",
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                userId:user._id,
                progress:progress,
                task_description:task.task_description,
                statusId:statusId,
                role:user.role
            })
        })
        const ans = await result.json()
        setInfo(true)
        setMeta({
            success:ans.success,
            message:ans.message
        })
    }
    if (load) return <>Loading</>
    return (<>
        <Navbar user={user}/>
        <div className='task-main'>
            
            <div className={status=='created'?'task-main-desc':status=='in progress'?'task-main-desc-prg':status=='completed'?'task-main-desc-comp':status=='closed'?'task-main-desc-closed':''}>
                <div className='task-main-part'><span className='task-main-span'>Task Description</span> : {task.task_description}</div>
                <div className='task-main-part'><span className='task-main-span'>Status</span> : {status}</div>
                <div className='task-main-part'><span className='task-main-span'>Last Updated At</span> : {hours<10?'0'+hours:hours}:{minutes<10?'0'+minutes:minutes} {x}  {day<10?'0'+day:day}/{month<10?'0'+month:month}/{year}</div>
                {
                    status!='closed'?<>
                    <div id='update-head'>Update Status</div>
                    <div className='update-status'>
                    {
                        user._id === task.createdBy || user.role=='Admin'?
                            <div className='update-btns'><button id='created' onClick={()=>handleStatus('created',status_id)}>Created</button></div>
                            : <></>
                    }
                    <div className='update-btns'><button id='in-progress' onClick={()=>handleStatus('in progress',status_id)}>In Progress</button></div>
                    <div className='update-btns'><button id='completed' onClick={()=>handleStatus('completed',status_id)}>Completed</button></div>
                    {
                        user._id === task.createdBy ||user.role=='Admin' ?
                            <div className='update-btns'><button id='close' onClick={()=>handleStatus('closed',status_id)}>Close</button></div>
                            : <></>
                    }
                </div></>:<></>
                }
            </div>
        </div>
        {
            info?<Info success={meta.success} message={meta.message}/>:<></>
        }
    </>

    )
}

export default Task