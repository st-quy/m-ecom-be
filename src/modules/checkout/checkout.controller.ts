import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { createCheckoutDto } from './dto/createCheckoutDto.dto';

@Controller('checkout')
export class CheckoutController {
    constructor(private readonly checkoutService: CheckoutService){}

    
  @Post('generateQRCode')
  async generateQRCode(@Body()  checkoutDto:  createCheckoutDto): Promise<any> {
    return this.checkoutService.generateQRCode(checkoutDto);
  }

}