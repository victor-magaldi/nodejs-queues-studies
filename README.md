# nodejs-queues-studies

##Setting up RabbitMQ on Linux
Ensure that RabbitMQ is installed. On Ubuntu, you can install it using the following commands:

```bash
    sudo apt-get update
    sudo apt-get install rabbitmq-server
    sudo service rabbitmq-server start
```

The RabbitMQ service should start automatically after installation. If not, you can manually start it with:

```
    sudo service rabbitmq-server start
```

## Project Setup

Install project dependencies:

```
 npm install
```

Run the project:

```
npm run dev
```

### Generating Messages for Your Queue

Use Postman to dispatch a request using the following cURL command:

```
curl --request POST \
 --url http://localhost:3000/queue/task \
 --header 'Content-Type: application/json' \
 --data '{
"name":"My name",
"id":"24194ba8-c90b-47e4-8442-45ee6afd2545"
}'

```

Check your terminal for the processing message:

```
Processing: {"name":"My name","id":"24194ba8-c90b-47e4-8442-45ee6afd2545"}
```

Make sure to replace the sample data with your own values. This setup enables you to work with Node.js queues efficiently.
