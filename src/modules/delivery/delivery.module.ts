import { Module } from '@nestjs/common';
import { HttpDeliveryModule } from './infra/http/http-delivery.module';
import { MessagerModule } from './infra/messager/messager.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/shared/infra/http/guards/auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [HttpDeliveryModule, MessagerModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class DeliveryModule {}
