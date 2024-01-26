import { Body, Controller, Get, HttpException, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/createUser.dto';
import { lastValueFrom } from 'rxjs';

@Controller('user')
export class UserController {
    constructor(@Inject("NATS_SERVICE") private natsClient:ClientProxy ){}

    @Post()
    createUser(@Body() createUserDto:CreateUserDto){
        console.log("createUserdto",createUserDto)
        return this.natsClient.send({ cmd: 'createUser' }, createUserDto);
    }

    @Get("/:id")
   async getUserById(@Param("id") id:string){
    const user = await lastValueFrom(
        this.natsClient.send({cmd:"getuserbyid"},{userid:id})
    )
    if(user) return user
    else throw new HttpException("User not found!",404)

    }

    @Get()
    async getAllUser(){
        const users = await lastValueFrom(
            this.natsClient.send({cmd:"getAllUser"},{data:'user'})
        )
        if(users) return users
        else throw new HttpException("Users not found!",404)
    }
}
