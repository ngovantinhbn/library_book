import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {OrderItem} from "./entities/orderItem.entity";
import {Repository} from "typeorm";
import {OrderEntity} from "./entities/order.entity";
import {Book} from "../book/entities/book.entity";
import {CreateOrderItemDto} from "./dto/order.dto";
import {BookService} from "../book/book.service";


@Injectable()
export  class  OrderItemService {
    constructor(
        @InjectRepository(OrderItem)
         private  readonly  itemRepository: Repository<OrderItem>,
        @InjectRepository(OrderEntity)
        private  readonly  orderRepository: Repository<OrderEntity>,

        private readonly productService: BookService,
    ) {
    }

    async create(payload: CreateOrderItemDto) {
        const order = await this.orderRepository.createQueryBuilder('Orders')
            .where('Orders.id = :payload',{payload: payload.orderId})
            .getOne();
        const product = await this.productService.findoneBook(payload.productId)

        const item = this.itemRepository.create({
            order,
            product,
            quantity: payload.quantity,
        });
        return await this.itemRepository.save(item);
    }

    async deleteOrder(id: number) {
        return  await this.itemRepository.delete(id)
    }
}