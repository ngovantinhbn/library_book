import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './jwt.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/entities/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;
    return super.canActivate(context);
  }

  // @ts-ignore
  handleRequest(err, user: User) {
    if (err || !user) {
      // throw new exc.Unauthorized({ errorCode: 'JWT011G', message: 'Account is not verified' });
    }
    return user;
  }
}
