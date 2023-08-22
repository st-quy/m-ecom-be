import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CartsService } from './carts.service';
import { Carts, CartsProducts } from './entities';
import { updateCartDTO } from './dto/updateCart.dto';

@Controller('carts')

export class CartsController {

    constructor(private readonly cartsService: CartsService) { }


    @Get(':userId')
    async getCartsByUserId(@Param('userId') userId: number) {
        return this.cartsService.getCartsByUserId(userId);
    }

    @Post('/userId/:userId/productId/:productId')
    async addToCart(@Param('userId') userId: number, @Param('productId') productId: number): Promise<CartsProducts> {
        return this.cartsService.addToCart(userId, productId);
    }

    @Patch()
    async updateCart(@Body() updateToCartDTO: updateCartDTO) {
        return await this.cartsService.updateCart(updateToCartDTO);
    }

    @Delete('remove/:userId/:productId')
    async removeFromCart(@Param('userId') cartId: string, @Param('productId') productId: string): Promise<Carts> {
    const cart = await this.cartsService.removeFromCart(cartId, productId);
    return cart;
    }


}
