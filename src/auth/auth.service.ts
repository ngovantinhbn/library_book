import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtAuthService } from './jwt.service';
import { loginUserDto, RegisterUserDto } from '../user/dto/user.dto';
import { User } from '../user/entities/user.entity';
import { AUTH } from '../constants/message.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const isExisted = await this.userService.getUserByUsername(
      registerUserDto.username,
    );
    if (isExisted) {
      throw new HttpException(AUTH.USER_IS_EXISTED, HttpStatus.BAD_REQUEST);
    }
    return this.userService.createUser(registerUserDto);
  }

  async login(loginUserDto: loginUserDto): Promise<any> {
    const { username, password } = loginUserDto;
    const user = await this.userService.getUserByUsername(username);
    if (!user || !user.comparePassword(password)) {
      throw new HttpException(AUTH.LOGIN_FAIL, HttpStatus.BAD_REQUEST);
    }
    return this.getToken(user);
  }

  async logout(user: User): Promise<void> {
    user.refreshAuthVersion();
    await user.save();
  }

  async refreshToken(user: User): Promise<any> {
    return this.getToken(user);
  }

  async getToken(user: User): Promise<any> {
    const accessToken = await this.jwtAuthService.createToken(user);
    const refreshToken = await this.jwtAuthService.createRefreshToken(user);
    return {
      tokenType: 'Bearer',
      accessToken,
      refreshToken,
    };
  }
}
