const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Happy Hacking!");
});

app.get("/api", (req, res) => {
  const data = {
    name: "sunjae",
    age: 25,
    admin: true,
    sex: "male",
    email: "kimsj9484@gmail.com"
  };
  res.send(data);
});

app.get("/api/courses/:id", (req, res) => {
  res.send(req.params.id);
});

app.get("/api/posts/:year", (req, res) => {
  res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
