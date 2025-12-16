import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UserSignInDto {
    @IsNotEmpty({ message: "Email is empty" })
    @IsEmail({}, { message: "please enter a valid email" })
    email: string;

    @IsNotEmpty({ message: "Password can not be empty" })
    @MinLength(4, { message: "Password should be minimum 4 character" })
    password: string;
}