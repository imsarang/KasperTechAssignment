import React, { useEffect, useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa'
import '../styles/tasks.css'

const CreateTask = ({ setInfo,setMeta,setCreate, token,setViewAll,setViewAssigned,user }) => {
    // const [taskDesc,setTaskDesc] = useState('')
    const [users, setUsers] = useState([])
    const [assignedTo, setAssignedTo] = useState([{
        name: null, id: null
    }])
    const [search, setSearch] = useState('')
    const [assignId, setAssignId] = useState([])
    useEffect(() => {
        handleShowSearch()
    }, [search])

    const handleShowSearch = async () => {
        const result = await fetch(`/api/user/search?user=${search}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const ans = await result.json()
        if (ans.success) {
            setUsers(ans.user)
        }
    }
    const handleSubmit = async (e) => {
        console.log(assignId);
        e.preventDefault()
        const result = await fetch(`/api/task/assign`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                assigned: assignId
            })
        })
        const ans = await result.json()
        if (ans.success) {
            setCreate(false)
            user.role=='Admin'?setViewAll(true):setViewAssigned(true)
        }
        setInfo(true)
        setMeta({
            success:ans.success,
            message:ans.message
        })
    }

    const handleAddCreate = (item) => {
        let flag = 0;
        for (let i = 0; i < assignedTo.length; i++) {
            if (assignedTo[i].name == item.name) {
                flag = 1; break;
            } else flag = 0;
        }
        if (flag == 0) {
            setAssignedTo([...assignedTo, { name: item.name, id: item._id }])
            setAssignId([...assignId, item._id])
        }
    }
    const handleRemoveAssign = (user)=>{
        setAssignId(assignId.filter(item=>item!==user.id))
        setAssignedTo(assignedTo.filter(item=>item.id!=user.id))
    }
    const handleClose = ()=>{
        setCreate(false)
        user.role=='Admin'?setViewAll(true):setViewAssigned(true)
    }
    return (
        <div className='create-bg'>
            <div className='create-main'>
                <form onSubmit={handleSubmit}>
                    <div className='close-create'>
                        <FaPlus onClick={handleClose} id='remove-icon' />
                    </div>
                    <div className='task-description'>
                        {/* <input
                type='text'
                value={taskDesc}
                onChange={(e)=>setTaskDesc(e.target.value)}
                placeholder='Enter Task Description'
                className='task-input'
                /> */}
                    </div>
                    <div className='search-bar'>
                        <div id='input-search'>
                            <input
                                type='text'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder='Search User'
                                className='user-search'
                            />
                        </div>
                        <FaSearch id='search-icon' />
                    </div>
                    <div className='search-users-div'>
                    {
                        users.length != 1 && search != '' ? <div className='searched-div'>
                            {
                                users.map((item) => {
                                    if(item.role!='Admin')return <div className='searched-user'onClick={() => handleAddCreate(item)}>
                                        <div className='search-name'>
                                            Name : {item.name}
                                        </div>
                                        <div className='search-email'>
                                            Email: {item.email}
                                        </div>
                                    </div>
                                })
                            }
                        </div> : <></>
                    }
                    </div>
                    {
                        assignedTo.length != 1 ? <div className='assigned-users'>
                            {
                                assignedTo.map((user,index) => {
                                    if(index!=0)
                                    return <div className='assign-user'>
                                        {user.name} <FaPlus id='remove-assign' onClick={()=>handleRemoveAssign(user)}/>
                                    </div>
                                })
                            }
                        </div> : <></>
                    }

                    <div className='task-create-btn'>
                        <button type='submit' id='task-create-btn'>Create Task</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTask