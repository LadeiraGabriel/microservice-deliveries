import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5000',
      package: 'communication',
      protoPath: '/proto-order-delivery/order.proto',
    },
  });
  app.startAllMicroservices();

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3333);
}
bootstrap();
