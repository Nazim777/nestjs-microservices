import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}
    
    userCreate(createUserDto:CreateUserDto){
        const newUser = this.userRepository.create(createUserDto)
    return this.userRepository.save(newUser)

    }

    singleUserGet(userid:string){
        return this.userRepository.findOne({
            where:{id:userid},
            relations:['payments']
        })
    }

    findAllUser(){
        return this.userRepository.find({relations:['payments']})
    }

  
}
