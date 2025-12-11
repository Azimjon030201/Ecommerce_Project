import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserSignUpDto{
    @IsNotEmpty({message:"Name can not be empty"})
    @IsString({message:"Name should be string"})
    name:string;

    @IsNotEmpty({message:"Email is empty"})
    @IsEmail({},{message:"please enter a valid email"})
    email:string;

    @IsNotEmpty({message:"Password can not be empty"})
    @MinLength(4,{message:"Password should be minimum 4 character"})
    password:string;
}