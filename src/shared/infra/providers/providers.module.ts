import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrderProvider } from 'src/modules/delivery/application/providers/order-provider';
import { OrderGrpcProvider } from './order-grpc-provider';
import { join } from 'path';
import { AuthProvider } from '@modules/auth/application/providers/auth.provider';
import { JwtProvider } from './jwt.provider';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.CONNECT_GRPC_ORDER,
          package: 'orders',
          protoPath: join(__dirname, '../protos/order.proto'),
        },
      },
    ]),
  ],

  providers: [
    {
      provide: OrderProvider,
      useClass: OrderGrpcProvider,
    },
    {
      provide: AuthProvider,
      useClass: JwtProvider,
    },
  ],
  exports: [OrderProvider, AuthProvider],
})
export class ProvidersModule {}
