import {Module} from '@nestjs/common';
import {CartService} from './cart.service';
import {CartController} from './cart.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Cart} from "./entities/cart.entity";
import {BookModule} from "../book/book.module";
import {UserModule} from "../user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Cart]),
        BookModule,
        UserModule
    ],
    providers: [CartService],
    controllers: [CartController],
    exports :[CartService]
})
export class CartModule {
}
