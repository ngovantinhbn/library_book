import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Book} from "./book.entity";
import {OrderEntity} from "../../order/entities/order.entity";
import {User} from "../../user/entities/user.entity";

@Entity('review')
export class ReviewEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Book , book => book.reviews )
    @JoinColumn()
    book: Book

    @ManyToOne(type => User, user => user.username)
    @JoinColumn()
    user : User;

    @Column()
    rating: number;

    @Column()
    comment: string;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;
}