import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { getProductsDto } from './dto/getProductsDto.dto';
import { Products } from './entities';
import { SortBy } from 'src/commons/constants/enum';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get('/search')
    async searchProducts(@Query() searchDto: getProductsDto): Promise<Products[]> {
      return this.productsService.searchProducts(searchDto);
    }


}

  
