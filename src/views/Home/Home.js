import React, { useState } from 'react'
import Task from './../../components/Task/Task'
import './Home.css'
const Home = () => {

const [taskList, setTaskList] = useState([
    {
        id:1,
        title: 'Make ToDo List ',
        description: 'sir naraj ho jayenge',
        priority:'high'
    },
    {
        id:2,
        title: 'Redmi revision',
        description: 'nahi to interview hard jayga',
        priority:'very high'
    },
    {
        id:3,
        title: 'Enjoy life',
        description: 'ye life fir nahi meilegi',
        priority:'high'
    },
    {
        id:4,
        title: 'hardwork karo',
        description: 'successs 100 % milega ',
        priority:'high' 
    }
])

const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [priority, setpriority] = useState('')
    return (
        <>
            <div className='container'>
                <h1 className='app-title'>Goal Chaser List🎯</h1>

                <div className='todo-flex-container'>
                    <div>
                        <h1 className='text-center'>Show List</h1>
                        {
                           taskList.map((taskItem, index) => {
                            const {id,priority,title,description}= taskItem;
                              return  <Task id={id} priority={priority} title={title} description={description}/>
                           })
                        }
                    </div>
                    <div>
                        <h1 className='text-center'> Add List</h1>
                        <div className='add-task-form-container'>
                            <form>
                                title:
                                <input type="text" vaule={title} onChange={(e) => {
                                    
                                }}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home


