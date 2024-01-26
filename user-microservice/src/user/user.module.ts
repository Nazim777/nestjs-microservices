import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user';
import { Payment } from 'src/typeorm/entities/payment';

@Module({
  imports:[TypeOrmModule.forFeature([User,Payment])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
