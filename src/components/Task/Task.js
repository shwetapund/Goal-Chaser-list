import React from "react";
import "./Task.css"
import imgDelete from "./images/delete.png"
import imgPencil from './images/pencil.png'
const Task = ({ id, title, description, priority, removeTaskFromList, setTaskEditable}) => {
    return (
        <>
            <div className="task-container" >
                <h1 className="task-title">{title}</h1>
                <p className="task-description">{description}</p>
                <span className="task-priority">🎯 {priority}</span>
                <span>

                    <img src={imgDelete} className="task-delete-icon"
                    onClick={() => {
                  
                    removeTaskFromList(id);
                }}
                    />
                </span>
                <span>

                    <img src={imgPencil} className="task-edit-icon"
                    onClick={() => {
                  
                        setTaskEditable(id);
                }}
                    />
                </span>
            </div>
        </>
    )
}

export default Task