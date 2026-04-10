import React from "react";

function TaskItem({ task, updateStatus, deleteTask }) {

  const toggleStatus = () => {
    const newStatus = task.status === "todo" ? "done" : "todo";
    updateStatus(task.id, newStatus);
  };

  return (
    <div className="task">
      <span>{task.title}</span>

      <div>
        <button onClick={toggleStatus}>
          {task.status === "todo" ? "Done" : "Undo"}
        </button>

        <button onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;