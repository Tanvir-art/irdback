const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://frontend-nine-beryl-26.vercel.app",
    ],
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type"],
  })
);

const dbPath = path.resolve(__dirname, "database/dua_main.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

app.get("/categories", (req, res) => {
  const query = "SELECT * FROM category";
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error running query:", err.message);
      res.status(500).json({ error: "Failed to fetch categories" });
    } else {
      res.json(rows);
    }
  });
});

app.get("/subcategories", (req, res) => {
  const query = "SELECT * FROM sub_category";
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error running query:", err.message);
      res.status(500).json({ error: "Failed to fetch subcategories" });
    } else {
      res.json(rows);
    }
  });
});

app.get("/duas", (req, res) => {
  const query = "SELECT * FROM dua";
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error running query:", err.message);
      res.status(500).json({ error: "Failed to fetch duas" });
    } else {
      res.json(rows);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
