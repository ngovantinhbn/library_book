import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Book} from "../../book/entities/book.entity";
import {User} from "../../user/entities/user.entity";
import {OrderEntity} from "../../order/entities/order.entity";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    total: number

    @Column()
    quantity: number

    @ManyToOne(type => Book, order => order.id)
    @JoinColumn()
    item: Book

    @ManyToOne(type => User, user => user.username)
    @JoinColumn()
    user: User

    // @ManyToOne(type => OrderEntity, order => order.cart)
    // @JoinColumn()
    // orders: OrderEntity
}