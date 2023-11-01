import React, {useState} from "react"
import Swal from 'sweetalert2'

import Modal from '../Modal';
import EditForm from "../EditForm";


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

  //for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>

        <div className="todo-item">
          <h3>{task.title}</h3>
          <p>Due: {task.duedate.substring(0,10)}</p>
          <p>XP Worth: {task.generalxp}</p>
          <input type="checkbox" onChange={handleCheckbox}/> Completed
          
          <div>
            <button className="rpg-button" onClick={openModal}>Edit Task</button>
            <Modal isOpen={isModalOpen} >

              <h2>Edit Task</h2>
              <div className="create-task-modal">
                <EditForm/>
              </div>
              <button onClick={closeModal}>Close</button>
            </Modal>
          </div>
        </div>
    </>
  )
}