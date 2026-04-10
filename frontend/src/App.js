import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskColumn from "./TaskColumn";
import "./App.css";

const API = "https://kanban-board-70ol.onrender.com/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setTasks(res.data);
    } catch (err) {
      setError("Error loading tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await axios.post(API, { title });
      setTitle("");
      fetchTasks();
    } catch {
      setError("Error adding task");
    }
  };

  const updateStatus = async (id, status) => {
    await axios.put(`${API}/${id}`, { status });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  const todoTasks = tasks.filter(t => t.status === "todo");
  const doneTasks = tasks.filter(t => t.status === "done");

  return (
    <div className="container">
      <h1>Mini Kanban Task Manager</h1>

      <div className="addTask">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="board">
        <TaskColumn
          title="To Do"
          tasks={todoTasks}
          updateStatus={updateStatus}
          deleteTask={deleteTask}
        />

        <TaskColumn
          title="Done"
          tasks={doneTasks}
          updateStatus={updateStatus}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;