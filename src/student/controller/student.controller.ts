import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { StudentService } from "../service/student.service";
import { SignupDTO } from "../dto/signup.dto";
import { ReportDTO } from "../dto/report.dto";
import { JWTGuard } from "../../auth/guard/jwt.guard";
import { Roles } from "../../auth/decorator/role.decorator";
import { Role } from "../../auth/roles/role.enum";
import { RoleGuard } from "../../auth/guard/role.guard";
import { CacheInterceptor, CacheKey } from "@nestjs/cache-manager";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { Report as ReportEntity } from "../..//models/Report";
import { Repository } from "typeorm";


@ApiTags("student")
@Controller('student')
@UseInterceptors(CacheInterceptor)
export class StudentController {
    constructor(@Inject('STUDENT_SERVICE') private readonly studentService: StudentService, @InjectRepository(ReportEntity) private readonly reportRepository: Repository<ReportEntity>) { }

    @ApiOperation({ summary: "Signs up a student" })
    @ApiResponse({ status: 201, description: "Signs up a studemt" })
    @Post('signup')
    @Roles(Role.STUDENT)
    async signupStudent(@Body() signupDTO: SignupDTO) {
        const student = await this.studentService.signup(signupDTO)
        if (student) {
            return student;
        }
    }


    @ApiOperation({ summary: "Get all students" })
    @ApiResponse({ status: 200, description: "Returns all students" })
    @Get()
    @CacheKey('students')
    @UseGuards(JWTGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async getStudents() {
        const students = await this.studentService.getAllStudents()
        if (students) {
            return students
        }
    }


    @ApiOperation({ summary: "Put a student report" })
    @ApiResponse({ status: 200, description: "Upload a student report/result" })
    @Put(':id')
    @UseGuards(JWTGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async uploadResult(@Param('id', ParseIntPipe) id: number, @Body() reportDTO: ReportDTO) {
        const result = await this.studentService.createReport(id, reportDTO)
        if (result) {
            return result
        }
    }


    @ApiOperation({ summary: "Get a student" })
    @ApiResponse({ status: 200, description: "Returns a student" })
    @Get(':id')
    @CacheKey('student-id')
    @UseGuards(JWTGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async getStuentById(@Param('id', ParseIntPipe) id: number) {
        const student = await this.studentService.getStudentById(id)
        if (!student) throw new HttpException("Student not found", HttpStatus.BAD_REQUEST)
    }


    @ApiOperation({ summary: "Delete a student" })
    @ApiResponse({ status: 200, description: "Delete a studemt" })
    @Delete(':id')
    @UseGuards(JWTGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async deleteStudent(@Param('id', ParseIntPipe) id: number) {
        return await this.studentService.deleteStudent(id)
    }

    @ApiOperation({ summary: "Get a student report" })
    @ApiResponse({ status: 200, description: "Get a studemt report" })
    @Get('report/:id')
    @UseGuards(JWTGuard)
    @Roles(Role.STUDENT, Role.ADMIN)
    async viewReport(@Param('id', ParseIntPipe) id: number) {
        return await this.studentService.viewReport(id)
    }

}