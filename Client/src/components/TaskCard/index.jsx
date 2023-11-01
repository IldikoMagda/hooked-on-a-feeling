import React, {useState} from "react"
import Modal from '../Modal';
import EditForm from "../EditForm";


export default function TaskCard ({task,completeTask}) {
  
  const [completed,setCompleted] = useState(false);
  const handleCheckbox = () => {
    setCompleted(!completed)
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
          <p>{task.content}</p>
          <p>{task.subject}</p>
          <p>Due: {task.duedate.substring(0,10)}</p>
          <p>XP Worth: {task.generalxp}</p>
          <input type="checkbox" onChange={handleCheckbox}  onClick={completeTask}/> Completed
          <div>
            <button className="rpg-button" onClick={openModal}>Edit Task</button>
            <Modal isOpen={isModalOpen} >

              <h2>Edit Task</h2>
              <div className="create-task-modal">
                <EditForm task={task} closeModal={closeModal}/>
              </div>
              
            </Modal>
          </div>
        </div>
    </>
  )
}