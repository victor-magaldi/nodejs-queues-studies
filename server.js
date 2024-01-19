const express = require("express");
const amqp = require("amqplib");

const app = express();
const PORT_PRODUCER = 3000;
const PORT_CONSUMER = 3001;
const QUEUE_NAME = "exampleQueue";

app.use(express.json());

const startApp = async () => {
  // Configuração do RabbitMQ
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  channel.assertQueue(QUEUE_NAME, { durable: true });

  // Rota do produtor
  app.post("/send-message", async (req, res) => {
    const message = req.body.message;
    channel.sendToQueue(QUEUE_NAME, Buffer.from(message), { persistent: true });
    res.json({ status: "Message sent to the queue" });
  });

  // Rota do consumidor
  app.get("/consume-message", (req, res) => {
    channel.prefetch(1);

    channel.consume(QUEUE_NAME, (msg) => {
      if (msg !== null) {
        const message = msg.content.toString();
        console.log(`Received message: ${message}`);
        // Adicione aqui a lógica de processamento do consumidor

        channel.ack(msg);
        res.json({ status: "Message processed by the consumer" });
      }
    });
  });

  app.listen(PORT_PRODUCER, () => {
    console.log(`Producer is running on http://localhost:${PORT_PRODUCER}`);
  });

  app.listen(PORT_CONSUMER, () => {
    console.log(`Consumer is running on http://localhost:${PORT_CONSUMER}`);
  });
};

startApp();
