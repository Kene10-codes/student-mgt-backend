import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { SignupDTO } from '../dto/signup.dto';
import { ReportDTO } from '../dto/report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword, encodeToken } from '../../utils/bcrypt';
import { Report as ReportEntity } from '../../models/Report';
import { Student as StudentEntity } from '../../models/Student';
import { JwtService } from '@nestjs/jwt';
import { Console } from 'console';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
    @InjectRepository(ReportEntity)
    private readonly reportRepository: Repository<ReportEntity>,
    private readonly jwtService: JwtService
  ) {}

  // Generate refresh token
  async generateRefreshToken(payload) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES, 
    });
  }

  async generateAccessToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m', 
    });
  }

  // create student
  async signup(signupDto: SignupDTO) {
    const { email, password } = signupDto;
    if (!password) {
      throw new BadRequestException('Password is required');
    }

    // encode password
    signupDto.password = encodePassword(password);
    const student = this.studentRepository.create({...signupDto, roles: undefined});
    if (student) {
      const isStudent = await this.studentRepository.findOneBy({ email });
      if (isStudent) {
        throw new HttpException('Student exists already', HttpStatus.FORBIDDEN);
      }
      const { password: _, id, name, ...user } = student
     const token  =  await this.generateRefreshToken(user) 
     const tokenTwo = await this.generateAccessToken(user)
     const refreshToken = encodeToken(token)
     const accessToken = encodeToken(tokenTwo)
      await this.studentRepository.save({...student, createdAt: new Date(), refreshToken: refreshToken, is_revoked: false});
      return {accessToken: accessToken, name}
    } else {
      throw new HttpException("Student was not succesfully created", HttpStatus.BAD_REQUEST);
    }
  }

  // get all studentsv
  getAllStudents(): Promise<StudentEntity[]> {
    const students = this.studentRepository.find({ relations: ['report'] });
    if (students) {
      return students;
    } else {
      throw new HttpException('No Student Found!!!', HttpStatus.NOT_FOUND);
    }
  }

  // Report Sheet
  // create student report sheet
  async createReport(id: number, reportDTO: ReportDTO) {
    const student = await this.studentRepository.findOneByOrFail({ id });
    
   if(student.id) {
    const report = this.reportRepository.create(reportDTO);
    const savedReport = await this.reportRepository.save({
        ...report,
        total: reportDTO.english + reportDTO.mathematics + reportDTO.science,
      });
      (await student).report = savedReport;
      return await this.studentRepository.save(student);
    }  else {
        throw new HttpException("Student does not match", HttpStatus.NOT_FOUND)
   }  
}


// get student 
async getStudentById(id: number): Promise<StudentEntity>{
   const student = this.studentRepository.findOneByOrFail({id})
   if(!student) {
    return student
    } else {
        throw new HttpException("Student not found", HttpStatus.BAD_REQUEST)
    }
}

async deleteStudent(id: number){
    const student = this.studentRepository.delete({id})
    if(student) {
     return "Student deleted"
     } else {
      throw new HttpException("Student not found", HttpStatus.BAD_REQUEST)
     }
 }
  
}
