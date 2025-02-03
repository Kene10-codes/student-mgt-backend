import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { Role } from '../../auth/roles/role.enum';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TeacherDTO {
    @ApiProperty({ example: "John Doe" , description: "Enter your name" })
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: "Johndoe@gmail.com" , description: "Enter your email" })
    email: string;
    @Exclude()
    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty({ example: "PasswordDoe7878%^" , description: "Enter your password" })
    password: string;
    @ApiProperty({ example: "Student" , description: "Enter your role" })
    roles: Role[]
}