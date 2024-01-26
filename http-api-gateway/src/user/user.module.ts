import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports:[NatsClientModule],
  controllers: [UserController]
})
export class UserModule {}
