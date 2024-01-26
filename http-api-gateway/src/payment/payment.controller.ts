import { Body, Controller, Get, HttpException, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePaymentDto } from './dtos/createPayment.dto';
import { lastValueFrom } from 'rxjs';

@Controller('payment')
export class PaymentController {
    constructor(@Inject("NATS_SERVICE") private natsClient:ClientProxy){}

    @Post()
    createPayment(@Body() createPaymentDto:CreatePaymentDto){
        return this.natsClient.send({ cmd: 'createPayment' }, createPaymentDto)

    }

    @Get("/:id")
   async singlePayment(@Param("id") id:string){
    const payment = await lastValueFrom(this.natsClient.send({cmd:"singlePayment"},{paymentid:id}))
    if(payment)  return payment 
    else{
      return new HttpException("Invalid payment id!",404)
    }
   
    }


    @Get()
    async allPayment (){
        const allPayment = await lastValueFrom(this.natsClient.send({cmd:"allPayment"},{data:"payment"}))
        if(allPayment) return allPayment
        else{
            return new HttpException("No payment found!",404)
        }
    }
}
