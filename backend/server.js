const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory tasks array
let tasks = [
  { id: 1, title: "Learn React", status: "todo" },
  { id: 2, title: "Build Project", status: "done" }
];

// 1️⃣ GET all tasks
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// 2️⃣ CREATE task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title cannot be empty" });
  }

  const newTask = {
    id: Date.now(),
    title,
    status: "todo"
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// 3️⃣ UPDATE task status
app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  if (status !== "todo" && status !== "done") {
    return res.status(400).json({ message: "Invalid status" });
  }

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.status = status;

  res.status(200).json(task);
});

// 4️⃣ DELETE task
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(index, 1);

  res.status(200).json({ message: "Task deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 