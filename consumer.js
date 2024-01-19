const amqp = require("amqplib");

const QUEUE_NAME = "exampleQueue";

const startConsumer = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  channel.assertQueue(QUEUE_NAME, { durable: true });
  channel.prefetch(1);

  console.log("Consumer is waiting for messages. To exit press CTRL+C");

  channel.consume(QUEUE_NAME, (msg) => {
    if (msg !== null) {
      const message = msg.content.toString();
      console.log(`Received message: ${message}`);
      // Adicione aqui a lógica de processamento do consumidor

      channel.ack(msg);
    }
  });
};

startConsumer();
