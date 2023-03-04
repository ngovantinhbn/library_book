import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, JoinColumn, OneToMany, OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../base/role/role.enum';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { config } from '../../config/config.service';
import {OrderEntity} from "../../order/entities/order.entity";
import {Cart} from "../../cart/entities/cart.entity";
import {ReviewEntity} from "../../book/entities/review.entity";

export enum State {
  InActive = 0,
  Active = 1,
  Deleted = 2,
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    enum: State,
    default: State.Active,
  })
  @Exclude({ toPlainOnly: true })
  state: State;

  @Column({ default: Role.Admin })
  role: Role;

  @Column({ type: 'bigint', nullable: true })
  @Exclude()
  authVersion: number;

  @Column({nullable: true, type:"bigint"})
  phoneNumber: number;

  @Column({nullable: true})
  country: string;

  @Column({ nullable: true})
   city: string


  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleteAt: Date;

  @OneToMany(() => OrderEntity, (order) => order.customer)
  orders: OrderEntity[];

  @OneToMany(type => ReviewEntity, review => review.id)
  @JoinColumn()
  review : ReviewEntity[];

  @OneToMany(type => Cart, cart => cart.id)
  @JoinColumn()
  cart: Cart[]

  refreshAuthVersion() {
    this.authVersion = new Date().getTime();
  }

  setPassword(password: string) {
    this.password = bcrypt.hashSync(password, config.PASSWORD_SALT);
    this.refreshAuthVersion();
  }

  comparePassword(rawPassword: string): boolean {
    return bcrypt.compareSync(rawPassword, this.password);
  }
}
export type RequestUser = Request & { user: User };
