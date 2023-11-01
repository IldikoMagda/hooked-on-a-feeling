import React, {useState} from "react"

export default function TaskCard ({ task, completeTask }) {
  const [completed,setCompleted] = useState(false);
  const handleCheckbox = () => {
    setCompleted(!completed)
  }
  return (
    <>

        <div className="todo-item">
          <h3>{task.title}</h3>
          <p>Due: {task.duedate.substring(0,10)}</p>
          <p>XP Worth: {task.generalxp}</p>
          <input type="checkbox" onChange={handleCheckbox} onClick={completeTask} /> Completed
        </div>
    </>
  )
}