import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsPositive, IsNotEmpty } from 'class-validator';

export class CreateOrderItemDto {
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    readonly orderId: number;

    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    readonly productId: number;

    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    readonly quantity: number;

}
export class CreateOrderDto {

    @ApiProperty({example: 10})
    total: number

    @ApiProperty({example: 20})
    shippingPrice: number
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}