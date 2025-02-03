import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorator/role.decorator";
import { Role } from "../roles/role.enum";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAll<Role[]>(ROLES_KEY, [
            context.getClass(),
            context.getHandler()
        ])

        if(!requiredRoles){
            return true
        }

        const { user } = context.switchToHttp().getRequest()
        console.log("user", user)
        return requiredRoles.some(role => user.role?.includes(role))
    }
}