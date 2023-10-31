import React, {useState} from "react"

export default function TaskCard ({task}) {
  const [completed,setCompleted] = useState(false);
  const handleCheckbox = () => {
    setCompleted(!completed)
  }
  return (
    <>
  <h1>Task List</h1>
        <div className="todo-item">
          <h3>{task.title}</h3>
          <p>Due: {task.duedate.substring(0,10)}</p>
          <p>XP Worth: {task.generalxp}</p>
          <input type="checkbox" onChange={handleCheckbox}/> Completed
        </div>
    </>
  )
}