import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkout } from './entities/checkout.entity';
import { Carts } from '../carts/entities';
@Module({
  imports: [TypeOrmModule.forFeature([Checkout,Carts])],
  controllers: [CheckoutController],
  providers: [CheckoutService]
})
export class CheckoutModule {}
