import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { IJwtPayload } from './jwt.interface';
import { config } from '../config/config.service';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Create token
  async createToken(user: User): Promise<string> {
    const payload: IJwtPayload = {
      sub: user.username,
      uav: user.authVersion,
    };
    return this.jwtService.sign(payload);
  }

  // Verify Token
  verify = (token: string) => {
    return this.jwtService.verify(token);
  };

  // Authenicate when user want to login
  async authenticate(payload: IJwtPayload): Promise<User> {
    const { uav, sub } = payload;
    const user = await this.userService.getUserByUsername(sub);
    if (!user || uav !== user.authVersion) {
      throw new UnauthorizedException('Token is expried');
    }
    return user;
  }

  //refesh token
  async createRefreshToken(user: User): Promise<string> {
    const payload: IJwtPayload = {
      sub: user.username,
      uav: user.authVersion,
    };
    const jwtOption = {
      secret: config.REFRESH_SECRET,
      expiresIn: config.REFRESH_TOKEN_EXP,
    };
    return this.jwtService.sign(payload, jwtOption);
  }
}
