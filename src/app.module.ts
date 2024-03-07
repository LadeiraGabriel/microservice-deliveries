import { Module } from '@nestjs/common';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [DeliveryModule, AuthModule],
})
export class AppModule {}
