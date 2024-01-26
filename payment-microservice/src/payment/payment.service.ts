import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/typeorm/entities/payment';
import { Repository } from 'typeorm';
import { CreatePayemntDto } from './dtos/createPayment.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/typeorm/entities/user';

@Injectable()
export class PaymentService {
    constructor( 
        @InjectRepository(Payment) private paymentsRepository: Repository<Payment>,
        @Inject("NATS_SERVICE") private natsClient:ClientProxy,
    ){}

   async paymentCreate({userid,...createPaymentDto}:CreatePayemntDto){
        const user =  await lastValueFrom<User>( this.natsClient.send({cmd:"getuserbyid"},{userid}))
       console.log('user from payment microservice',user)
       if(!user) throw new HttpException("User not found!",404)
       const newPayment = this.paymentsRepository.create({
        ...createPaymentDto,
        user
       });
    //    console.log('new payment form payment microservice',newPayment)
       return this.paymentsRepository.save(newPayment)
       
    }

   async singlePayment(id:string){
        const payment = await this.paymentsRepository.findOne({
            where:{id},
            relations:['user']
        }) 
        return payment

    }

     findAllPayment(){
        return this.paymentsRepository.find({relations:["user"]})
    }

}
