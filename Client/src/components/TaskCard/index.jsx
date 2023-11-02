import React, { useState } from "react";
import Swal from "sweetalert2";
import Modal from "../Modal";
import EditForm from "../EditForm";

export default function TaskCard({ task, completeTask }) {
  const [completed, setCompleted] = useState(false);
  const handleCheckbox = () => {
    setCompleted(!completed);
    Swal.fire("Task Completed", "Nice Work. Keep it Up", "success");
  };

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
        <div className="todo-title">
          <h3>{task.title}</h3>
        </div>
        <div className="todo-content">
          <p>{task.content}</p>
        </div>
        <div className="todo-subject">
          <p>{task.subject}</p>
        </div>
        <div className="todo-duedate">
          <p>Due: {task.duedate.substring(0, 10)}</p>
        </div>
        <div className="todo-xp">
          <p>XP Worth: {task.generalxp}</p>
        </div>
        <div className="todo-completed">
          <input
            type="checkbox"
            onChange={handleCheckbox}
            onClick={() => completeTask(task.item_id)}
          />{" "}
          Completed
        </div>
        <div>
          <button className="rpg-button todo-edit-button" onClick={openModal}>
            Edit Task
          </button>
          <Modal isOpen={isModalOpen}>
            <h2>Edit Task</h2>
            <div className="create-task-modal">
              <EditForm task={task} closeModal={closeModal} />
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}
