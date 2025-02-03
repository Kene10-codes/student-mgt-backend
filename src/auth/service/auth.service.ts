import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { LoginDTO } from "../dto/login.dto";
import { Student as StudentEntity} from "../../models/Student";
import { comparePassword, encodeToken } from "../../utils/bcrypt";
import { Teacher as TeacherEntity } from "../../models/Teacher";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(StudentEntity) 
        private readonly studentRepository: Repository<StudentEntity>,
        @InjectRepository(TeacherEntity)
        private readonly teacherRepository: Repository<TeacherEntity>,
        private readonly jwtService: JwtService
){}


 async generateAccessToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m', 
    });
  }

  async generateRefreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d', 
    });
  }

    async validateStudent({ email, password } : LoginDTO ) {
        const student = await this.studentRepository.findOneBy({email})
        if(student) {
          const verifyStudent = await comparePassword(password, student.password);
          if(verifyStudent) {
                 const {password: _, ...rest} = student
                 const access_token = await this.generateAccessToken(rest)
                 const token = await this.generateRefreshToken(rest)
                 const refresh_token = encodeToken(token)
                  student.refreshToken = refresh_token
                  await this.studentRepository.save(student)
                  return {access_token, refresh_token}
          }else {
            throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST)
          }
        } else {
         throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST)
        }
    }

    async validateAdmin({ email, password } : LoginDTO ) {
      const teacher = await this.teacherRepository.findOneBy({email})
      if(teacher) {
        const verifyTeacher = await comparePassword(password, teacher.password);
        if(verifyTeacher) {
               const {password: _, ...rest} = teacher
               const access_token = await this.generateAccessToken(rest)
               const token = await this.generateRefreshToken(rest)
               const refresh_token = encodeToken(token)
                teacher.refreshToken = refresh_token
                await this.teacherRepository.save(teacher)
                return {access_token, refresh_token}
        }else {
          throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST)
        }
      } else {
       throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST)
      }
  }
}