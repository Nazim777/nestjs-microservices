import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsOptional,
    IsEmail,
  } from 'class-validator';
  
  export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(32)
    username: string;


    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
  }