import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "src/models/Student";
import { Teacher } from "src/models/Teacher";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./service/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { LocalStratergy } from "./stratergies/local.stratergy";
import { JWTStratergy } from "./stratergies/jwt.stratergy";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
          secret: process.env.SECRET_KEY,
          signOptions: {expiresIn: process.env.EXPIRES_IN}
        }),
        TypeOrmModule.forFeature([Student, Teacher])],
    providers: [{
        provide: "AUTH_SERVICE",
        useClass: AuthService
    }, LocalStratergy, JWTStratergy],
    controllers: [AuthController]
})

export class AuthModule {}