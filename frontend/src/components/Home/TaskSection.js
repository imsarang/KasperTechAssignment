import React, { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NoTasks from '../Info/NoTasks';

const TaskSection = ({ setInfo,setMeta,taskArray ,token,user}) => {

  const navigate = useNavigate()

  
  const handleTask = (task)=>{
    navigate(`/task/${task._id}`)
  }
  const handleTrash = async(task)=>{
    const result = await fetch(`/api/task/delete/${task._id}`,{
      method:'DELETE',
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    const ans = await result.json()
    setInfo(true)
    setMeta({
      success:ans.success,
      message:ans.message
    })
  }
  if (taskArray.length == 0) return <NoTasks/>
  return (<>
  <div className='number-task'>Number of Tasks : {taskArray.length}</div>
    <div className='task-section'>
      {
        taskArray.map((task) => {
          const status = task.statusLogs[task.statusLogs.length-1].status
          const dateObj = new Date(task.statusLogs[task.statusLogs.length - 1].updatedAt)
          const day = dateObj.getDate()
          const month = dateObj.getMonth()+1
          const year = dateObj.getFullYear()
          const hours = dateObj.getHours()>12?dateObj.getHours()-12:dateObj.getHours()
          const x = dateObj.getHours()>12?'PM':"AM"
          const minutes = dateObj.getMinutes()

          return <div className={status=='created'?'task-info':status=='in progress'?'task-info-progress':status=='completed'?'task-info-comp':status=='closed'?'task-info-closed':''}>
            <div  onClick={()=>handleTask(task)}>
              <div><span className='task-span'>Task Description</span> : {task.task_description}</div>
              <div><span className='task-span'>Status</span> : {task.statusLogs[task.statusLogs.length - 1].status}</div>
              <div><span className='task-span'>Last Update</span> : {hours<10?'0'+hours:hours}:{minutes<10?'0'+minutes:minutes} {x} {day<10?'0'+day:day}/{month<10?'0'+month:month}/{year}</div>
            </div>
            {
              user._id !== task.assignedTo._id?
            <div><FaTrash id='delete-task' onClick={()=>handleTrash(task)}/></div>
              :<></>
            }
          </div>
        })
      }
    </div></>
  )
}

export default TaskSection