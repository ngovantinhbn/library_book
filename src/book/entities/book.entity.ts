import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, ManyToOne, OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {Cart} from "../../cart/entities/cart.entity";
import {OrderEntity} from "../../order/entities/order.entity";
import {ReviewEntity} from "./review.entity";

export enum BookState {
    InActive= 0,
    Active = 1,
    Delete = 2,
}

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Cart, cart => cart.id)
    @JoinColumn()
    cart: Cart[]

    @OneToMany(() => ReviewEntity, review => review.book )
    reviews: ReviewEntity[]

    @Column({unique: true})
    title: string;

    @Column()
    author: string;

    @Column()
    category: string;

    @Column()
    des: string;

    @Column({nullable: true})
    pageNumber: number;

    @Column({ nullable: true })
    img1: string;

    @Column({ nullable: true })
    img2: string;

    @Column({ nullable: true })
    rating: number;

    @Column("text", { array: true , nullable: true})
    review: string[];

    @Column({ nullable: true })
    countInStock: number;

    @Column({ type: "bigint" , nullable:true})
     price: number;

    @Column({ type: "bigint" , nullable: true})
    oldPrice: number;

    @CreateDateColumn({ type: 'timestamptz' })
    releaseDate: Date
}
