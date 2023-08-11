
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
  
   @Get('/search')
    async searchProducts(@Query() searchDto: getProductsDto): Promise<Products[]> {
      return this.productsService.searchProducts(searchDto);
    }

  // Lấy sản phẩm theo ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<ProductDTO> {
      const product = await this.productService.findById(id);
      const productDTO: ProductDTO = {
        id: product.id,
        product_name: product.product_name,
        brand: product.brand,
        category: product.category.category_name, 
        price: product.price,
        description: product.description,
        image: product.image,
        sku: product.sku,
        quantity_inventory: product.quantity_inventory,
        status: product.status,
        deleteAt: product.delete_At,
        quantity_sold: product.quantity_sold,
      };
      return productDTO;
  }

  // Thêm sản Phẩm
  @Post()
  async create(@Body() createProductDTO: CreateProductDTO): Promise<Products> {
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


