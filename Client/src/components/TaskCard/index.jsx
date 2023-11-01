import React, {useState} from "react"
import Swal from 'sweetalert2'

export default function TaskCard ({task}) {
  const [completed,setCompleted] = useState(false);
  const handleCheckbox = () => {
    setCompleted(!completed)
    Swal.fire(
      'Task Completed',
      'Nice Work. Keep it Up',
      'success'
    )
  }
  return (
    <>

        <div className="todo-item">
          <h3>{task.title}</h3>
          <p>Due: {task.duedate.substring(0,10)}</p>
          <p>XP Worth: {task.generalxp}</p>
          <input type="checkbox" onChange={handleCheckbox}/> Completed
        </div>
    </>
  )
}