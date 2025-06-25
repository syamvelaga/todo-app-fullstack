const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./todos.db", (err) => {
  if (err) return console.error(err.message);
  console.log("Connected to SQLite DB");
});

// db.run(
//   `CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)`
// );

// Get all todos
app.get("/api/todos", (req, res) => {
  db.all(`SELECT * FROM todos`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Create new todo
app.post("/api/todos", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });
  db.run(`INSERT INTO todos (text) VALUES (?)`, [text], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, text });
  });
});

// Update todo
app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  db.run(`UPDATE todos SET text = ? WHERE id = ?`, [text, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// Delete todo
app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM todos WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
