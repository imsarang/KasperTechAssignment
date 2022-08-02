import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NoTasks from '../Info/NoTasks';

const TaskSection = ({ setInfo,setMeta,taskArray ,token,user}) => {

  const navigate = useNavigate()
  const [scrollTop, setScrollTop] = useState(false);

  useEffect(()=>{
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
          setScrollTop(true);
      } else {
          setScrollTop(false);
      }
  });
  },[])

  const goToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

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
    goToTop()
  }
  if (taskArray.length == 0) return <NoTasks/>
  return (<>
  <div className='colour-scheme'>
  <div className='sample-1'></div><div className='sample-content'>created</div>
  <div className='sample-2'></div><div className='sample-content'>in progress</div>
  <div className='sample-3'></div><div className='sample-content'>completed</div>
  <div className='sample-4'></div><div className='sample-content'>closed</div>
  </div>
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
            <div  onClick={()=>handleTask(task)} className='task-content'>
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