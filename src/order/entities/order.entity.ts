import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn,
    ManyToOne,
    OneToMany, OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";

import {User} from "../../user/entities/user.entity";
import {OrderItem} from "./orderItem.entity";
import {Exclude} from "class-transformer";


@Entity('Orders')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (customer) => customer.orders)
    @JoinColumn({ name: 'customer_id' })
    customer: User;

    @Exclude()
    @OneToMany(() => OrderItem, (ordenItem) => ordenItem.order)
    items: OrderItem[];

    @Column({type:'bigint'})
    total: number

    @Column({type: 'bigint'})
    shippingPrice: number

    @CreateDateColumn({type: 'timestamptz', nullable: true})
    createAt: Date;

    @DeleteDateColumn({type: 'timestamp', nullable: true})
    deleteAt: Date;

}