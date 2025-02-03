import { Body, Controller, Inject, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { TeacherService } from "../service/teacher.service";
import { TeacherDTO } from "../dto/teacher.dto";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags("admin")
@Controller("teacher")
@UseInterceptors(CacheInterceptor)
export class TeacherController {
    constructor(@Inject('TEACHER_SERVICE') private readonly teacherService: TeacherService){}

    @ApiOperation({ summary: 'Signs up an Admin' })
    @ApiResponse({ status: 201, description: 'Signs up an admin'})
    @Post('signup')
    signupTeacher(@Body() teacherDTO:TeacherDTO) {
       return this.teacherService.signup(teacherDTO)
    }
}