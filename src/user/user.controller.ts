import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RequestUser, User } from './entities/user.entity';
import { Roles } from '../base/role/roles.decorator';
import { Role } from '../base/role';
import {changePasswordDto, CreateAdress, IdsDto, updateUserDto} from './dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get('/me')
  async getme(@Req() req: RequestUser): Promise<User> {
    return req.user;
  }

  @ApiBearerAuth()
  @Post('/changePassword')
  async changePassword(
    @Req() req: RequestUser,
    @Body() changePasswordDto: changePasswordDto,
  ) {
    console.log(req.user.id);
    return this.userService.changePassword(req.user.id, changePasswordDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List user info' })
  async getAllUser(): Promise<User[]> {
    return this.userService.getAllUser();
  }

  @Get('/:id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param() param): Promise<User> {
    return this.userService.findOne(param.id);
  }

  @Put('/:id')
  @ApiParam({ name: 'id', type: Number })
  updateProfile(@Param() param, @Body() dto: updateUserDto): Promise<any> {
    return this.userService.updateUser(param.id, dto);
  }

  @Put('/profile/user')
  @ApiBearerAuth()
  updateAdress( @Body() dto: CreateAdress, @Req() req: RequestUser): Promise<any> {
    console.log(req.user.id)
    return this.userService.updateProfile(req.user.id, dto);
  }

  @Delete('deleteMany')
  deleteUser(@Body() dto: IdsDto): Promise<any> {
    return this.userService.bulkDelete(dto.ids);
  }
}
