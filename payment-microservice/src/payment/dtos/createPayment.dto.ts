import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePayemntDto{
    @IsNotEmpty()
    @IsNumber()
    amount:number


    @IsNotEmpty()
    @IsString()
    userid:string
}