import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/user';
import { Payment } from './typeorm/entities/payment';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'nestjs',
    entities: [User,Payment],
    synchronize: true,
    username: 'testuser',
    password: 'admin',
  }),UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
