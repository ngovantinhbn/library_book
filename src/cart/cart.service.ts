import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Cart} from "./entities/cart.entity";
import {Book} from "../book/entities/book.entity";
import {BookService} from "../book/book.service";
import {UserService} from "../user/user.service";
import {addToCart } from "./dto/cart.dto";

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        private readonly bookService: BookService,
        private readonly userService: UserService,
    ) {}
    async addToCart(dto: addToCart, user_id: number): Promise<any> {
        const cartItems = await this.cartRepository.find({ relations: ["item",'user'] });
        const product = await this.bookService.findoneBook(dto.productId);
        const productExit = await this.cartRepository.createQueryBuilder('cart')
            .where('cart.itemId = :idbook',{idbook: dto.productId})
            .getOne();
        const authUser = await this.userService.findOne(user_id)

        //Confirm the product exists.
        if (product) {
            //confirm if user has item in cart
            const cart = cartItems.filter(
                (item) => item.item.id === dto.productId && item.user.id === user_id,
            );
            if (cart.length < 1) {

                const newItem = this.cartRepository.create({ total: product.price * dto.quantity, quantity: dto.quantity });
                newItem.user = authUser;
                newItem.item = product;
                return await this.cartRepository.save(newItem)
            }
            else {
                //Update the item quantity
                const quantity = (cart[0].quantity += dto.quantity);
                const total = cart[0].total * quantity;
                console.log(quantity)
                console.log(cart[0].quantity)
                return await this.cartRepository.update(cart[0].id, { quantity, total });
            }
        }
        return null;
    }

    async getAllItemInCart(user_id: number){
        const cart =  await this.cartRepository.createQueryBuilder('cart')
            .leftJoinAndSelect('cart.item', 'books')
            .leftJoinAndSelect('cart.user', 'user')
            .where('cart.userId = :id',{id: user_id})
            .getMany();
        return cart;
    }
    async deleteItemInCart(id: number, user_id: number) {
        const itemdelete = await  this.cartRepository.createQueryBuilder('cart')
            .leftJoinAndSelect('cart.item', 'books')
            .leftJoinAndSelect('cart.user', 'user')
            .where('cart.itemId = :idbook',{ idbook: id })
            .andWhere('cart.userId = :iduser',{ iduser: user_id })
            .getOne()

        return this.cartRepository.delete(itemdelete.id)
    }
}
