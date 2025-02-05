import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher as TeacherEntity } from "src/models/Teacher";
import { Repository } from "typeorm";
import { TeacherDTO } from "../dto/teacher.dto";
import { encodePassword } from "src/utils/bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherEntity)
    private readonly teacherRepository: Repository<TeacherEntity>,
    private readonly jwtService: JwtService) { }


  async generateAccessToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });
  }

  // Generate refresh token
  async generateRefreshToken(payload) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
    });
  }


  async signup(teacherDTO: TeacherDTO) {
    const { password, email } = teacherDTO
    const teacher = this.teacherRepository.create({ roles: teacherDTO.roles, ...teacherDTO })
    teacher.password = encodePassword(password)
    console.log("teacher", teacher)
    if (teacher) {
      const isAdmin = await this.teacherRepository.findOneBy({ email })
      if (isAdmin) {
        throw new HttpException("Teacher/Admin Exists Already", HttpStatus.BAD_REQUEST)
      }
      const { password: _, ...admin } = teacher
      const accessToken = await this.generateAccessToken(admin)
      const refreshToken = await this.generateRefreshToken(admin)
      await this.teacherRepository.save({ ...teacher, createdAt: new Date(), refreshToken: refreshToken, is_revoked: false })
      return { access_token: accessToken }
    } else {
      throw new NotFoundException()
    }

  }
}