import {Body, Controller, Delete, Get, Param, Post, Req} from '@nestjs/common';
import {CartService} from "./cart.service";
import {RequestUser} from "../user/entities/user.entity";
import {ApiBearerAuth, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {addToCart} from "./dto/cart.dto";
import {IdDto} from "../book/dto/book.dto";

@Controller('cart')
@ApiTags('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService
    ) {
    }

    @Post()
    @ApiBearerAuth()
    @ApiOperation({summary:"add book to cartItem"})
    createOrder(@Body() dto: addToCart, @Req() req: RequestUser) {
        return this.cartService.addToCart(dto, req.user.id)
    }

    @Get()
    @ApiOperation({summary:"Get item in cart user"})
    @ApiBearerAuth()
    getAllCart(@Req() req: RequestUser){
        return this.cartService.getAllItemInCart(req.user.id)
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: Number })
    @ApiOperation({summary:"delete item in cart user"})
    @ApiBearerAuth()
    deleteItemInCart(@Param() params: IdDto, @Req() req: RequestUser){
        return this.cartService.deleteItemInCart(params.id,req.user.id)
    }

}
