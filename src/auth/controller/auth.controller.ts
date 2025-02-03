import { Body, Controller, Get, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { LocalGuard } from "../guard/local.guard";
import { Request } from "express";
import { JWTGuard } from "../guard/jwt.guard";
import { Roles } from "../decorator/role.decorator";
import { Role } from "../roles/role.enum";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags('auth')
@Controller("auth")
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private readonly authService:  AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Logs in a student' })
    @ApiResponse({ status: 200, description: 'Logs in a student' })
    @UseGuards(LocalGuard)
    login(@Req() req: Request) {
        return req.user
    }

    // get user profile
    @Get('profile')
    @Roles(Role.STUDENT, Role.ADMIN)
    @UseGuards(JWTGuard)
    @ApiOperation({ summary: 'Get student or admin profile' })
    @ApiResponse({ status: 200, description: 'Returns student or admin profile ' })
    getProfile(@Req() req: Request) {
       return req.user
    }
}
