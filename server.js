const express = require("express");
const path = require("path");
const { myMiddleware } = require("./middleware/middleware");
const api = require("./routes/index.js");

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "myMiddleware"
app.use(myMiddleware);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.use(express.static("public"));

// GET Route for notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET Route for homepage
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// Wildcard route to direct users to a 404 page
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "public/pages/404.html"))
// );

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);