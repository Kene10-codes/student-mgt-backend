import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDTO {
    @ApiProperty({ example: "johndoe@gmail.com", description: 'Enter your email address' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'PassGeneva90&&1', description: "Enter your password"})
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}