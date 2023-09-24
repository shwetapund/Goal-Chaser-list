import React, { useEffect, useState } from 'react';

import Task from './../../components/Task/Task';
import './Home.css';
import showToast from 'crunchy-toast';
import { saveListToLocalStorage } from './../../Util/LocalStorage';
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



    const clearInputFields = () => {
        setTitle('');
        setDescription('');
        setPriority('');
    }

    const findTaskIndexById = (taskId) => {
        let index;

        taskList.forEach((task, i) => {
            if (task.id === taskId) {
                index = i
            }
        })
        return index;
    }

    const checkRequiredFields = () => {
        if(!title) {
            showToast('Title is required!','alert', 3000);
            return false;
        }
        if(!description) {
            showToast('Description is required','alert', 3000);
            return false;
        }
        if(!priority) {
            showToast('Priority is required','akert',3000);
            return false;
        }
        return true;
    }

    const addTaskToList = () => {

       if(checkRequiredFields() === false){
        return;
       }
     const randomId = Math.floor(Math.random() * 1000);

        const obj = {
            id: randomId,
            title: title,
            description: description,
            priority: priority

        }
        const newTaskList = [...taskList, obj]

        setTaskList(newTaskList)

        clearInputFields()
        
        saveListToLocalStorage(newTaskList)

        showToast('task added successsfully', 'success', 3000);
    }

    const removeTaskFromList = (id) => {

        const index = findTaskIndexById(id);
        const tempArray = taskList;
        tempArray.splice(index, 1);

        setTaskList([...tempArray])

        saveListToLocalStorage(tempArray);
        showToast('task deleted successsfully', 'alert', 3000);
    }

    const setTaskEditable = (id) => {
        setIsEdit(true);
        setId(id);

        const index = findTaskIndexById(id);
        const currentEditTask = taskList[index];

        setTitle(currentEditTask.title);
        setDescription(currentEditTask.description);
        setPriority(currentEditTask.priority);
        console.log(currentEditTask);
    }

    const updateTask = () => {
        if(checkRequiredFields() === false){
            return;
           }
           
        const indexToUpdate = findTaskIndexById(id);

        const tempArray = taskList;
        tempArray[indexToUpdate] = {
            id: id,
            title: title,
            description: description,
            priority: priority
        }

        setTaskList([...tempArray])

        saveListToLocalStorage(tempArray)
        showToast('task updated successsfully', 'info', 3000);

        setId(0);
        clearInputFields();
        setIsEdit(false);
    }
    return (
        <>
            <div className='container'>
                <h1 className='app-title'>Goal Chaser List🎯</h1>

                <div className='todo-flex-container'>
                    <div>
                        <h1 className='text-center'>Show List</h1>
                        <div className='tasks-container'>
                            {taskList.map((taskItem, index) => {
                                const { id, priority, title, description } = taskItem;

                                return <Task id={id}
                                    priority={priority}
                                    title={title}
                                    description={description}
                                    key={index}
                                    removeTaskFromList={removeTaskFromList}
                                    setTaskEditable={setTaskEditable}
                                />

                            })
                            }
                        </div>
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
                                    <button className='btn-add-task' type='button'
                                        onClick={()=>{
                                            isEdit ? updateTask() : addTaskToList()
                                        }}>
                                        {isEdit ? 'Update' : 'Add'}
                                    </button>
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


