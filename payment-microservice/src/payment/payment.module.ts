import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment } from 'src/typeorm/entities/payment';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { User } from 'src/typeorm/entities/user';

@Module({
  imports: [TypeOrmModule.forFeature([Payment,User]),NatsClientModule],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
