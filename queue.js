const amqp = require("amqplib");

function connect() {
  return amqp
    .connect("amqp://localhost")
    .then((conn) => conn.createChannel())
    .catch((err) => {
      console.error("Error connecting to RabbitMQ:", err);
      throw err;
    });
}

function createQueue(channel, queue) {
  return channel
    .assertQueue(queue, { durable: true })
    .then(() => channel)
    .catch((err) => {
      console.error(`Error creating queue '${queue}':`, err);
      throw err;
    });
}

function sendToQueue(queue, message) {
  connect()
    .then((channel) => createQueue(channel, queue))
    .then((channel) =>
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
    )
    .catch((err) =>
      console.error(`Error sending message to queue '${queue}':`, err)
    );
}

function consume(queue, callback) {
  connect()
    .then((channel) => createQueue(channel, queue))
    .then((channel) => channel.consume(queue, callback, { noAck: true }))
    .catch((err) => console.error(`Error consuming queue '${queue}':`, err));
}

module.exports = {
  sendToQueue,
  consume,
};
