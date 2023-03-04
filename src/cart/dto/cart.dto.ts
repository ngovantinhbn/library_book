import {ApiProperty} from "@nestjs/swagger";

export class addToCart {
    @ApiProperty()
    productId: number

    @ApiProperty()
    quantity: number
}