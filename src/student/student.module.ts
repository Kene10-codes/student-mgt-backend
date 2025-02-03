import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "src/models/Student";
import { StudentService } from "./service/student.service";
import { StudentController } from "./controller/student.controller";
import { Report } from "src/models/Report";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_REFRESH_SECRET,
            signOptions: {expiresIn: "7d"}
        }),
        TypeOrmModule.forFeature([Student, Report])],
    controllers: [StudentController],
    providers: [{
        provide: 'STUDENT_SERVICE',
        useClass: StudentService
    }]
})

export class StudentModule {}