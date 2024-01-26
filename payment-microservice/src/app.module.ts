import { Module } from '@nestjs/common';
import { PaymentModule } from './payment/payment.module';
import { Payment } from './typeorm/entities/payment';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/user';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'nestjs',
    entities: [Payment,User],
    synchronize: true,
    username: 'testuser',
    password: 'admin',
  }),PaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
