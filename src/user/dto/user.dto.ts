import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  NotEquals,
} from 'class-validator';
import { Role } from '../../base/role/role.enum';
import { USER } from '../../constants/message.constant';
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ example: 'admin123' })
  @MinLength(5, { message: USER.USERNAME_LENGTH })
  @MaxLength(30, { message: USER.USERNAME_LENGTH })
  @IsNotEmpty({ message: USER.USER_NAME_NOT_EMPTY })
  @NotEquals('me')
  username: string;

  @ApiProperty({ example: 'admin' })
  @MinLength(5, { message: USER.FULLNAME_LENGTH })
  @IsNotEmpty()
  @MaxLength(30, { message: USER.FULLNAME_LENGTH })
  fullName: string;

  @ApiProperty({ example: '123123' })
  @IsNotEmpty({ message: USER.PASSWORD_NOT_EMPTY })
  @MinLength(5, { message: USER.PASSWORD_LENGTH })
  @MaxLength(30, { message: USER.PASSWORD_LENGTH })
  @IsString()
  password: string;

  @ApiProperty({ enum: Role })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
export class changePasswordDto {
  @ApiProperty({ example: '123456' })
  @IsNotEmpty({ message: USER.PASSWORD_NOT_EMPTY })
  @MinLength(5, { message: USER.PASSWORD_LENGTH })
  @MaxLength(30, { message: USER.PASSWORD_LENGTH })
  newPassword: string;
}
export class loginUserDto {
  @ApiProperty({ example: 'admin123' })
  @MinLength(5, { message: USER.USERNAME_LENGTH })
  @MaxLength(30, { message: USER.USERNAME_LENGTH })
  @IsNotEmpty({ message: USER.USER_NAME_NOT_EMPTY })
  @NotEquals('me')
  username: string;

  @ApiProperty({ example: '123123' })
  @IsNotEmpty({ message: USER.PASSWORD_NOT_EMPTY })
  @MinLength(5, { message: USER.PASSWORD_LENGTH })
  @MaxLength(30, { message: USER.PASSWORD_LENGTH })
  @IsString()
  password: string;
}
export class updateUserDto extends PickType(RegisterUserDto, [
  'username',
  'fullName',
]) {}
export class IdsDto {
  @IsNotEmpty()
  @IsArray()
  @IsPositive({ each: true })
  ids: number[];
}

export class CreateAdress {
  @ApiProperty({ example: 'admin' })
  // @MinLength(5, { message: USER.FULLNAME_LENGTH })
  // @IsNotEmpty()
  // @MaxLength(30, { message: USER.FULLNAME_LENGTH })
  fullName: string;

  @ApiProperty({ example: '0335727805' })
  // @MinLength(8, { message: USER.FULLNAME_LENGTH })
  phoneNumber: number;

  @IsString()
  @ApiProperty({ example: 'Ha Dong' })
  // @MinLength(3, { message: USER.USERNAME_LENGTH })
  country: string;

  @ApiProperty({ example: 'Ha Noi' })
  // @MinLength(3, { message: USER.USERNAME_LENGTH })
  city: string
}