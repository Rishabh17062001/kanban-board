import React from "react";
import TaskItem from "./TaskItem";

function TaskColumn({ title, tasks, updateStatus, deleteTask }) {
  return (
    <div className="column">
      <h2>{title}</h2>

      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          updateStatus={updateStatus}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}

export default TaskColumn;