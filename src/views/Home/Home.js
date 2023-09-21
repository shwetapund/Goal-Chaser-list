import React, { useState } from 'react'
import Task from './../../components/Task/Task'
import './Home.css'
const Home = () => {

    const [taskList, setTaskList] = useState([
        {
            id: 1,
            title: 'Make ToDo List ',
            description: 'sir naraj ho jayenge',
            priority: 'high'
        },
    
    
    ])

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('')

    const addTaskToList = () => {
        const randomId = Math.floor(Math.random() * 1000);
        const obj = {
            id :randomId,
            title: title ,
            description: description,
            priority: priority

        }
        setTaskList([...taskList, obj])
        setTitle('');
        setDescription('');
        setPriority('');
    }
    return (
        <>
            <div className='container'>
                <h1 className='app-title'>Goal Chaser List🎯</h1>

                <div className='todo-flex-container'>
                    <div>
                        <h1 className='text-center'>Show List</h1>
                        {
                            taskList.map((taskItem, index) => {
                                const { id, priority, title, description } = taskItem;
                                return <Task id={id} priority={priority} title={title} description={description} />
                            })
                        }
                    </div>
                    <div>
                        <h1 className='text-center'> Add List</h1>
                        <div className='add-task-form-container'>

                            <form>

                                <input type="text"
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value)
                                    }}
                                    placeholder='Enter title' 
                                    className='task-input'/>
                        
                                <input type="text"
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value)
                                    }}
                                    placeholder='Enter description'
                                    className='task-input' />
                                
                                <input type="text" value={priority} onChange={(e) => {
                                    setPriority(e.target.value)
                                }}
                                    placeholder='Enter priority' 
                                    className='task-input'/>

                                <button className='btn-add-task' type='button' onClick={addTaskToList}>
                                    Add Task to list
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home


