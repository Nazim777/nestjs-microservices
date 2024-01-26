import { Body, Controller, Inject } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePayemntDto } from './dtos/createPayment.dto';

@Controller('payment')
export class PaymentController {
    constructor(
        private paymentService:PaymentService,
        @Inject("NATS_SERVICE") private natsClient:ClientProxy,
        ){}

    @MessagePattern({cmd:"createPayment"})
   async createPayment(@Body() createPaymentDto:CreatePayemntDto){
        // console.log("message payload received",createPaymentDto)
      const newPayment = await this.paymentService.paymentCreate(createPaymentDto)
      console.log('new payment form payment microservice',newPayment)
    //  if(newPayment) return  this.natsClient.emit('paymentCreated',newPayment)
    if(newPayment){
        this.natsClient.emit('paymentCreated',newPayment)
        return newPayment
    } 
    }

    @MessagePattern({cmd:"singlePayment"})
    getSinglePayment(@Payload() data){
        const {paymentid} = data
        return this.paymentService.singlePayment(paymentid)
    }

    
    @MessagePattern({cmd:"allPayment"})
    getAllPayment(){
        return this.paymentService.findAllPayment()
    }
}
