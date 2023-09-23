import React, { useEffect, useState } from 'react'
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
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {

        const list = JSON.parse(localStorage.getItem('pinklist'));
        if (list && list.length > 0) {
            setTaskList(list)
        }

    }, [])

    const saveListToLocalStorage = (tasks) => {
        localStorage.setItem('pinklist', JSON.stringify(tasks))
    }

    const addTaskToList = () => {
        const randomId = Math.floor(Math.random() * 1000);
        const obj = {
            id: randomId,
            title: title,
            description: description,
            priority: priority

        }
        const newTaskList = [...taskList, obj]
        setTaskList(newTaskList)
        setTitle('');
        setDescription('');
        setPriority('');

        saveListToLocalStorage(newTaskList);
    }
    const removeTaskFromList = (id) => {

        let index;
        taskList.forEach((task, i) => {
            if (task.id === id) {
                index = i
            }
        })

        const tempArray = taskList;
        tempArray.splice(index, 1);

        setTaskList([...tempArray])

        saveListToLocalStorage(tempArray);
    }

    const setTaskEditable = (id) => {
        setIsEdit(true); 
        setId(id); 
        let currentEditTask;

        taskList.forEach((task) => {
            if(task.id === id){
                currentEditTask = task;
            }
        })

        setTitle(currentEditTask.title);
        setDescription(currentEditTask.description);
        setPriority(currentEditTask.priority);
         console.log(currentEditTask);                                                           
    }

    const updateTask  = () =>{
        let indexToUpdate;
        taskList.forEach((task, i) => {
            if(task.id === id){
                indexToUpdate = i;
            }
           
        })

        const tempArray = taskList;
        tempArray[indexToUpdate] = {
            id:id,
            title:title,
            description:description,
            priority:priority
        }

        setTaskList([...tempArray])

        saveListToLocalStorage(tempArray)

        setId(0);
        setTitle('');
        setDescription('');
        setPriority('');
        setIsEdit(false);
    }
    return (
        <>
            <div className='container'>
                <h1 className='app-title'>Goal Chaser List🎯</h1>

                <div className='todo-flex-container'>
                    <div>
                        <h1 className='text-center'>Show List</h1>
                        {taskList.map((taskItem, index) => {
                            const { id, priority, title, description } = taskItem;

                            return <Task id={id}
                                priority={priority}
                                title={title}
                                description={description}
                                key={index}
                                removeTaskFromList={removeTaskFromList}
                                setTaskEditable = {setTaskEditable}
                            />

                        })
                        }
                    </div>
                    <div>
                        <h1 className='text-center'>
                            {isEdit ? `Update Task ${id}` : 'Add Task'}   {/* ternary operator use */}
                        </h1>
                        <div className='add-task-form-container'>

                            <form>

                                <input type="text"
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value)
                                    }}
                                    placeholder='Enter title'
                                    className='task-input' />

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
                                    className='task-input' />

                                <div className='btn-container'>
                                    {
                                        isEdit ?
                                            <button className='btn-add-task' type='button'
                                                onClick={updateTask}>
                                                Update
                                            </button> :
                                            <button className='btn-add-task' type='button'
                                                onClick={addTaskToList}>
                                                Add
                                            </button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home


