import { Module } from "@nestjs/common";
import { TeacherService } from "./service/teacher.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "src/models/Teacher";
import { TeacherController } from "./controller/teacher.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: {expiresIn: process.env.EXPIRES_IN}
          }),
        TypeOrmModule.forFeature([Teacher])],
    controllers: [TeacherController],
    providers: [{
            provide: "TEACHER_SERVICE",
            useClass: TeacherService
        }]
})

export class TeacherModule {}