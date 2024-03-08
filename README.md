## Este projeto foi criado com o intuito de aprender mais sobre gRPC, RabbitMQ e comunicação entre microservices

### Este projeto comunica com o projeto microservice orders --> 
#### https://github.com/LadeiraGabriel/microservice-orders

Toda parte rest do projeto está documentada com swagger em /api.

O rabbit MQ é usado para receber os pedidos de uma fila de orders para delivery.

O GRPC foi utilizado para enviar avisos ao microservice orders quando a entrega é atualizada, iniciando ou finalizando uma entrega.
