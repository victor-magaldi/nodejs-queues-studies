const queue = require("./queue");

const processMessage = (message) => {
  try {
    const messageContent = message.content.toString();
    console.log("Processing: " + messageContent);
  } catch (error) {
    console.error("Error processing message:", error);
  }
};

const consumeQueue = (queueName) => {
  queue.consume(queueName, processMessage);
};

consumeQueue("fila1");
