import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../service/auth.service";

@Injectable()
export class LocalStratergy extends PassportStrategy(Strategy) {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService) {
        super({
            "usernameField": "email"
        })
    }

   async  validate(email: string, password: string){
    if(email === process.env.ADMIN) {
        const admin = await this.authService.validateAdmin({email, password})
        if(!admin) {
            throw new HttpException("Invalid User Info", HttpStatus.NOT_FOUND)
        }  
        return admin
    } else {
        const user = await this.authService.validateStudent({email, password})
        if(!user) {
            throw new HttpException("Invalid User Info", HttpStatus.NOT_FOUND)
        }
        return user
    }
    }
}