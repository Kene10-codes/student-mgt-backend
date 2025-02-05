import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator'
import { Role } from '../../auth/roles/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDTO {
    @ApiProperty({ example: "John Doe", description: "Enter your name" })
    @IsNotEmpty()
    @MinLength(6)
    name: string;

    @ApiProperty({ example: "example@gmail.com", description: "Enter your email" })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: "Password2020#0", description: "Enter your password" })
    @Exclude()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty({ example: "student", description: "Enter your role - Optional" })
    @IsOptional()
    roles?: Role[]
}