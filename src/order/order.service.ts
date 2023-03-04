import {Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {OrderEntity} from "./entities/order.entity";
import {CreateOrderDto} from "./dto/order.dto";
import {UserService} from "../user/user.service";


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        private customerService: UserService
    ) {
    }

    async create(id: number, dto: CreateOrderDto) {
        const newOrder = new OrderEntity();
        const customer = await this.customerService.findOne(id)
        newOrder.customer = customer;
        newOrder.total = dto.total;
        newOrder.shippingPrice = dto.shippingPrice;

        return this.orderRepository.save(newOrder);
    }

    async findById(id: number) {
        const order = await this.orderRepository.createQueryBuilder('Orders')
            .leftJoinAndSelect('Orders.items', 'orderItem')
            .leftJoinAndSelect('Orders.customer', 'user')
            .leftJoinAndSelect('orderItem.product', 'books')
            .where('Orders.customer_id = :id', {id: id})
            .getMany();
        if (!order)
            throw new NotFoundException(`Order with id ${id} not found in database`);

        return order;
    }

    async deleteOrder(id: number) {
        return await this.orderRepository.delete(id)
    }


}
