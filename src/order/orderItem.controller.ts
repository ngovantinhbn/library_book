import {ApiBearerAuth, ApiParam, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Param, Post} from "@nestjs/common";
import {OrderItemService} from "./orderItem.service";
import {CreateOrderItemDto} from "./dto/order.dto";

@ApiTags('Order-Item')
@Controller('order-item')
export class OrderItemController {
    constructor(private readonly itemsService: OrderItemService) {
    }

    @Post()
    async create(@Body() payload: CreateOrderItemDto) {
        return await this.itemsService.create(payload);
    }

    @ApiBearerAuth()
    @Delete('/:id')
    @ApiParam({ name: 'id', type: Number })
    async deleteOrder (@Param() params){
        return this.itemsService.deleteOrder(params.id)
    }
}
