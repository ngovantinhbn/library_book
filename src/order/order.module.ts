import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderEntity} from "./entities/order.entity";
import {UserModule} from "../user/user.module";
import {CartModule} from "../cart/cart.module";
import {OrderItem} from "./entities/orderItem.entity";
import {BookModule} from "../book/book.module";
import {OrderItemController} from "./orderItem.controller";
import {OrderItemService} from "./orderItem.service";

@Module({
  imports: [
      TypeOrmModule.forFeature([OrderEntity, OrderItem]),
      UserModule,
      BookModule,
      CartModule
  ],
  controllers: [OrderController, OrderItemController],
  providers: [OrderService, OrderItemService]
})
export class OrderModule {}
