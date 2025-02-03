import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class JWTGuard extends AuthGuard("jwt"){
    constructor(private readonly jwtService: JwtService) {
        super()
    }
  async canActivate(context: ExecutionContext): Promise<boolean> {
        
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
        throw new UnauthorizedException("Token should be provided");
      }

      try {
       const payload= await this.jwtService.verifyAsync(token, {secret: process.env.JWT_ACCESS_SECRET})
       // populate the payload in the user
       request['user'] = payload;
      } catch (error) {
        throw new UnauthorizedException("Token is invalid");
      }

      const canActivate = await super.canActivate(context);
      return canActivate as boolean;
    }
    
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['authorization'].split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }
}