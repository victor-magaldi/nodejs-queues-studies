const express = require("express");
const amqp = require("amqplib");

const app = express();
const PORT = 8000;
const QUEUE_NAME = "exampleQueue";

app.use(express.json());

const startProducer = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  channel.assertQueue(QUEUE_NAME, { durable: true });

  app.post("/send-message", async (req, res) => {
    const message = req.body.message;
    channel.sendToQueue(QUEUE_NAME, Buffer.from(message), { persistent: true });
    res.json({ status: "Message sent to the queue" });
  });

  app.listen(PORT, () => {
    console.log(`Producer is running on http://localhost:${PORT}`);
  });
};

startProducer();
