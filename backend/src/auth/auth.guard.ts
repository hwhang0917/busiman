import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import {
  ADMIN_CTX,
  APPROVED_CTX,
  PUBLIC_CTX,
} from 'src/common/common.constant';
import { Employee } from 'src/employees/entities/employee.entity';
import { AuthErr, RequiredErr } from 'src/errors/message.error';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Get guards
    const adminGuard: boolean = this.reflector.get(
      ADMIN_CTX,
      context.getHandler(),
    );
    const approvedUserGuard: boolean = this.reflector.get(
      APPROVED_CTX,
      context.getHandler(),
    );
    const publicGuard: boolean = this.reflector.get(
      PUBLIC_CTX,
      context.getHandler(),
    );

    // Execute public guard
    if (publicGuard) {
      return true;
    }

    // Get logged in user
    const { user }: { user?: Employee } = context.switchToHttp().getRequest();

    // Deny logged-out (public) access
    if (!user) {
      throw new UnauthorizedException(RequiredErr.auth);
    }

    // Execute admin guard
    if (adminGuard) {
      if (user.isAdmin) return true;
      throw new UnauthorizedException(AuthErr.admin);
    }

    // Execute approved user guard
    if (approvedUserGuard) {
      if (user.approvedByAdmin) return true;
      throw new UnauthorizedException(AuthErr.approved);
    }

    // No guard (only login auth)
    return true;
  }
}
