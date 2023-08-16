
import { Controller, Post, Body, Delete, Patch, Param, Get, ParseIntPipe,Query  } from '@nestjs/common';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { Products } from './entities/products.entity';
import { ProductsService } from './products.service';
import { SortBy } from 'src/commons/constants/enum';
import { getProductsDto } from './dto/getProductsDto.dto';
import { UpdateProductDTO } from './dto/UpdateProduct.dto';
import { ProductDTO } from './dto/Product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  
   @Get()
    async searchProducts(@Query() searchDto: getProductsDto): Promise<Products[]> {
      return this.productService.searchProducts(searchDto);
    }

  // Lấy sản phẩm theo ID
  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number): Promise<ProductDTO> {
    const product = await this.productService.findById(id);
    return product;
  }

  // Thêm sản Phẩm
  @Post()
  async create(@Body() createProductDTO: CreateProductDTO): Promise<ProductDTO> {
    return await this.productService.createProduct(createProductDTO);
  }

  //Cập nhật sản phẩm theo ID
  @Patch(':id')
  async updateProduct(@Param('id') id: number, @Body() updateProductDTO: UpdateProductDTO) {
    return this.productService.updateProduct(id, updateProductDTO);
  }

  //Xóa sản phẩm theo ID
  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}

