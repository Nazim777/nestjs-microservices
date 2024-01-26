import { Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @MessagePattern({ cmd: 'createUser' })
    createUser(@Body() createUserDto:CreateUserDto){
        console.log("message payload received",createUserDto)
        return this.userService.userCreate(createUserDto)

    }

    @MessagePattern({cmd:"getuserbyid"})
    getSingleUser(@Payload() data){
        const {userid} = data
        console.log('userid',userid)
        return this.userService.singleUserGet(userid)

    }
    @MessagePattern({cmd:'getAllUser'})
    getAlllUser(){
        return this.userService.findAllUser()
    }


   @EventPattern('paymentCreated')
    paymentCreated(@Payload() data:any){
      console.log('new payment from user microservice',data)
    //  return data

    }
    
}
