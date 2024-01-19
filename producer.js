const express = require("express");
const app = express();
const queue = require("./queue");

app.use(express.json());

app.post("/queue/task", (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({ error: "Request body is required" });
  }

  queue.sendToQueue("fila1", body);

  res.json({ message: "Your request will be processed!" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
