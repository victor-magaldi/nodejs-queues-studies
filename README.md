# nodejs-queues-studies

## Linux - install and execute RabbitMQ

Certifique-se de ter o RabbitMQ instalado. No Ubuntu, você pode instalá-lo com

```
sudo service rabbitmq-server start
```

O serviço RabbitMQ deve iniciar automaticamente após a instalação. Se não, inicie-o com

```
sudo service rabbitmq-server start
```

## Linux - install and execute RabbitMQ

install dependencies

```
npm install
```

running Project

```
npm run dev
```

## Generate messages for yout Queue

In Ponstman dispatch Request for the next Curl

```
curl --request POST \
  --url http://localhost:3000/queue/task \
  --header 'Content-Type: application/json' \
  --data '{
	 "name":"My name",
	 "id":"24194ba8-c90b-47e4-8442-45ee6afd2545"
}'
```

In your terminal

```
Processing: {"name":"My name","id":"24194ba8-c90b-47e4-8442-45ee6afd2545"}
```
