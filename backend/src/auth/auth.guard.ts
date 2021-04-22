import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Required } from 'src/errors/message.error';
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
    const privateGuard = this.reflector.get('private', context.getHandler());
    if (!privateGuard) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (user) return true;
    throw new UnauthorizedException(Required.auth);
  }
}
