import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto, RegisterUserDto } from '../user/dto/user.dto';
import { RequestUser, User } from '../user/entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../base/role/roles.decorator';
import { Role } from '../base/role';

@ApiTags('Authentication')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @Post('/register')
  @ApiOperation({ summary: 'Rigister account' })
  register(@Body() dto: RegisterUserDto): Promise<User> {
    return this.authService.register(dto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login system' })
  login(@Body() dto: loginUserDto): Promise<User> {
    return this.authService.login(dto);
  }

  @Post('/logout')
  @ApiOperation({ summary: 'Logout system' })
  logout(@Req() req: RequestUser) {
    return this.authService.logout(req.user);
  }
}
