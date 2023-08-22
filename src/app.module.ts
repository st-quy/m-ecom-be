import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path'; // Import module path
import { CartsModule } from './modules/carts/carts.module';
import { CategoryModule } from './modules/category/category.module';
import { CheckoutModule } from './modules/checkout/checkout.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ProductsModule } from './modules/products/products.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PG_HOST'),
        port: configService.get('PG_PORT'),
        username: configService.get('PG_USER'),
        password: configService.get('PG_PASSWORD'),
        database: configService.get('PG_DB'),

        entities:  [path.join(__dirname, '**', '*.entity{.ts,.js}')],
        synchronize: true,
      }),
      inject: [ConfigService], 
    }),
    CartsModule,
    CategoryModule,
    CheckoutModule,
    PaymentModule,
    ProductsModule,
    RolesModule,
    UsersModule,
    AuthModule
  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}