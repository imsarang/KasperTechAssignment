import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import '../styles/homePage.css'
import { returnID, returnLocal, returnToken } from '../../localStorage'
import Sidebar from './Sidebar'
import { FaCreativeCommonsSampling, FaPlus } from 'react-icons/fa'
import TaskSection from './TaskSection'
import CreateTask from './CreateTask'
import Info from '../Info/Info'
const Home = () => {
  const token = JSON.parse(returnToken())
  const [user, setUser] = useState({})

  const [create, setCreate] = useState(false)
  const [viewCreate, setViewCreate] = useState(false)
  const [viewAssigned, setViewAssigned] = useState(true)
  const [viewAll,setViewAll] = useState(false)

  const [createdTasks, setCreatedTasks] = useState([])
  const [assignedTasks, setAssignedTasks] = useState([])
  const [allTasks,setAllTasks] = useState([])

  const [info,setInfo] = useState(false)
  const [meta,setMeta] = useState({
    success:null,
    message:null
  })
  useEffect(() => {
    handleCurretUser()
    handleTasks()
    showAllTasks()
  }, [createdTasks,assignedTasks,allTasks])

  const handleTasks = async () => {
    
    const result = await fetch(`/api/task/show`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    const ans = await result.json()
    if(ans.success){
      setCreatedTasks(ans.createdByTask)
      setAssignedTasks(ans.assignedToTask)
    }
  }

  const handleCurretUser = async () => {
   
    const result = await fetch(`/api/user/current`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const ans = await result.json()
    
    if (ans.success) {
      setUser(ans.user)
      // ans.user.role=='Admin'?setViewAll(true):setViewAssigned(true)
      
    } else {
      console.log(ans);
    }
  }

  const showAllTasks = async()=>{
    const result = await fetch(`/api/task/showAll`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    const ans = await result.json()

    if(ans.success){
      setAllTasks(ans.task)
    }
  }
  const handleCreate = () => {
    setCreate(true)
    setViewCreate(false)
    setViewAssigned(false)
    setViewAll(false)
  }

  const handleViewCreate = () => {
    setCreate(false)
    setViewCreate(true)
    setViewAssigned(false)
    setViewAll(false)
  }

  const handleViewAssigned = () => {
    setCreate(false)
    setViewCreate(false)
    setViewAssigned(true)
    setViewAll(false)
  }
  const handleViewAll = ()=>{
    setCreate(false)
    setViewCreate(false)
    setViewAssigned(false)
    setViewAll(true)
  }

  return (
    <div className='home'>
      <Navbar user={user}/>
      
      <div className='task-head'>
      <div className='task-click'>Click on one of the following</div>

        <div className='task-head-main'>
          <div className={create?'task-active':'task-part'} onClick={handleCreate}>
            Create Task <FaPlus id='task-add' />
          </div>
          <div className={viewCreate?'task-active':'task-part'} onClick={handleViewCreate}>
            Created Tasks
          </div>
          {
            user.role != 'Admin' ? <div className={viewAssigned?'task-active':'task-part'} onClick={handleViewAssigned}>
              Assigned Tasks
            </div> : <div className={viewAll?'task-active':'task-part'} onClick={handleViewAll}>
              View All Tasks
            </div>
          }
        </div>
      </div>
      {
        viewCreate ?<div> <TaskSection taskArray={createdTasks} token={token} user={user} setInfo={setInfo} setMeta={setMeta}/></div> :
          viewAssigned ?<div><TaskSection taskArray={assignedTasks} token={token} user={user} setInfo={setInfo} setMeta={setMeta}/> </div>:
            create ? <CreateTask setCreate={setCreate} token={token} setViewAssigned={setViewAssigned} setViewAll={setViewAll} user={user} setInfo={setInfo} setMeta={setMeta}/> : 
            viewAll?<TaskSection taskArray={allTasks} token={token} user={user} setInfo={setInfo} setMeta={setMeta}/>:<></>
      }
      {
        info?<Info success={meta.success} message={meta.message} setInfo={setInfo}/>:<></>
      }
    </div>
  )
}

export default Home