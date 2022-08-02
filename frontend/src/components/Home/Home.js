import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import '../styles/homePage.css'
import { returnID, returnLocal, returnToken } from '../../localStorage'
import Sidebar from './Sidebar'
import { FaCreativeCommonsSampling, FaPlus } from 'react-icons/fa'
import TaskSection from './TaskSection'
import CreateTask from './CreateTask'
const Home = () => {
  const token = JSON.parse(returnToken())
  const [user, setUser] = useState({})
  const [showSideBar, setShowSideBar] = useState(false)

  const [create, setCreate] = useState(false)
  const [viewCreate, setViewCreate] = useState(false)
  const [viewAssigned, setViewAssigned] = useState(true)
  const [viewAll,setViewAll] = useState(true)

  const [createdTasks, setCreatedTasks] = useState([])
  const [assignedTasks, setAssignedTasks] = useState([])
  const [allTasks,setAllTasks] = useState([])
  const [load, setLoad] = useState(false)

  const [info,setInfo] = useState(false)
  const [meta,setMeta] = useState({
    success:null,
    message:null
  })
  useEffect(() => {
    handleCurretUser()
    handleTasks()
    showAllTasks()
  }, [createdTasks,assignedTasks])

  const handleTasks = async () => {
    // setLoad(true)
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
    setLoad(false)
  }

  const handleCurretUser = async () => {
    // setLoad(true)
    const result = await fetch(`/api/user/current`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const ans = await result.json()
    
    if (ans.success) {
      setUser(ans.user)
      if(ans.user.role=='Admin'){
        setViewAll(true)
      setViewAssigned(false)
      }
      
    } else {
      console.log(ans);
    }
    setLoad(false)
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
  if (load) return <>Loading</>
  return (
    <div className='home'>
      <Navbar user={user} showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      {
        showSideBar ? <Sidebar /> : <></>
      }
      <div className='task-head'>
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
    </div>
  )
}

export default Home