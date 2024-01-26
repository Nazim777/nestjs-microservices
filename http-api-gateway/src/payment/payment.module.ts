import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports:[NatsClientModule],
  controllers: [PaymentController]
})
export class PaymentModule {}
