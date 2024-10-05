const express = require("express");
const PORT = 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello welcome to Sound Guide");
});

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});