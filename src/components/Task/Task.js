import React from "react";
import "./Task.css"
import img from "./images/delete.png"
const Task = ({ id, title, description, priority, removeTaskFromList}) => {
    return (
        <>
            <div className="task-container" >
                <h1 className="task-title">{title}</h1>
                <p className="task-description">{description}</p>
                <span className="task-priority">🎯 {priority}</span>
                <span>

                    <img src={img} className="delete-img"
                    onClick={() => {
                  
                    removeTaskFromList(id);
                }}
                    />
                </span>
            </div>
        </>
    )
}

export default Task