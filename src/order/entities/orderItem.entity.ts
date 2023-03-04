import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {Book} from "../../book/entities/book.entity";
import {OrderEntity} from "./order.entity";

@Entity('orderItem')
export class OrderItem  {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    quantity: number;

    @ManyToOne(() => Book)
    @JoinColumn({ name: 'product_id' })
    product: Book;

    @ManyToOne(() => OrderEntity, (order) => order.items)
    @JoinColumn({ name: 'order_id' })
    order: OrderEntity;

    @CreateDateColumn({type: 'timestamptz', nullable: true})
    createAt: Date;

    @DeleteDateColumn({type: 'timestamp', nullable: true})
    deleteAt: Date;
}