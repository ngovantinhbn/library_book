import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { State, User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  changePasswordDto, CreateAdress,
  RegisterUserDto,
  updateUserDto,
} from './dto/user.dto';
import { EntityId } from 'typeorm/repository/EntityId';
import { Role } from '../base/role/role.enum';

export interface userByUniqueKey {
  username?: string;
  email?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  getUserByUniqueKey(options: userByUniqueKey): Promise<User> {
    const findOption: Record<string, any>[] = Object.entries(options).map(
      ([key, value]) => ({ [key]: value }),
    );
    return this.repository
      .createQueryBuilder('user')
      .where(findOption)
      .andWhere({
        state: State.Active,
      })
      .getOne();
  }

  getUserByUsername(username: string): Promise<User> {
    return this.getUserByUniqueKey({ username });
  }

  async createUser(registerUserDto: RegisterUserDto): Promise<User> {
    const user = await this.repository.create(registerUserDto);
    user.setPassword(registerUserDto.password);
    return this.repository.save(user);
  }

  async changePassword(id: EntityId, dto: changePasswordDto): Promise<void> {
    const user = await this.repository
      .createQueryBuilder('user')
      .where('user.id =:id', { id: id })
      .getOne();
    user.setPassword(dto.newPassword);
    await user.save();
  }

  async bulkDelete(ids: EntityId[]): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update({
        state: State.Deleted,
        authVersion: new Date().getTime(),
      })
      .where(`id IN (:...ids)`, { ids })
      .execute();
  }

  async getAllUser(): Promise<User[]> {
    const users = await this.repository
      .createQueryBuilder('user')
      .where('user.state =:state', { state: State.Active })
      .getMany();
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.repository
      .createQueryBuilder('user')
      .where('user.id =:id', { id: id })
      .andWhere('user.state =:state', { state: State.Active })
      .getOne();
    return user;
  }

  async updateUser(id: number, updateUserDto: updateUserDto) {
    const user = this.repository.update(id, updateUserDto);
    return user;
  }

  async updateProfile(id: number, updateDto: CreateAdress ) {
    const user = this.repository.update(id, updateDto);
    return user;
  }

}
