import {Body, Controller, Delete, Get, Param, Post, Req} from '@nestjs/common';
import {OrderService} from "./order.service";
import {RequestUser} from "../user/entities/user.entity";
import {ApiBearerAuth, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {CreateOrderDto, CreateOrderItemDto} from "./dto/order.dto";
@ApiTags('Orders')
@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ) {
    }

    @ApiBearerAuth()
    @ApiOperation({summary: "create order for user"})
    @Post(':id')
    @ApiParam({ name: 'id', type: Number })
    async create(@Param()params, @Body() dto: CreateOrderDto ) {
        return await this.orderService.create(params.id, dto);
    }

   @ApiBearerAuth()
   @Get()
   async getAllUserOrder (@Req() req: RequestUser){
        return this.orderService.findById(req.user.id)
      }

    @ApiBearerAuth()
    @Delete('/:id')
    @ApiParam({ name: 'id', type: Number })
    async deleteOrder (@Param() params){
        return this.orderService.deleteOrder(params.id)
    }

}
