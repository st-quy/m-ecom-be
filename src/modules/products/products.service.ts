import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { Products } from './entities/products.entity';
import { UpdateProductDTO } from './dto/UpdateProduct.dto';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>
  ) {}

  // Tìm sản phẩm theo ID
  async findById(id: number): Promise<Products> {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.id = :id', { id })
      .andWhere('product.delete_At IS NULL')
      .getOne();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
  
  // Thêm sản phẩm
  async createProduct(createProductDTO: CreateProductDTO): Promise<Products>  {
    const product = new Products();
    product.product_name = createProductDTO.product_name;
    product.brand = createProductDTO.brand;
    product.category = createProductDTO.category;
    product.price = createProductDTO.price;
    product.description = createProductDTO.description;
    product.image = createProductDTO.image;
    product.sku = createProductDTO.sku;
    product.quantity_inventory = createProductDTO.quantity_inventory;
    product.status = 'being sold';
    product.delete_At = null;
    product.quantity_sold = 0;

    return await this.productRepository.save(product);
  }

  // Cập nhật sản phẩm theo ID
  async updateProduct(id: number, updateProductDTO: UpdateProductDTO): Promise<Products> {
    const product = await this.productRepository.findOne({ where: { id, delete_At: null } });
  
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found or already deleted`);
    }
  
    const updateFields = updateProductDTO;
  
    if (updateFields.delete_At === null) {
      product.delete_At = null; // Đặt trường delete_At thành null
      product.status = 'being sold'; // Đặt trạng thái thành "being sold"
    } else {
      // Cập nhật các trường khác khi delete_At không phải null
      product.product_name = updateFields.product_name ?? product.product_name;
      product.quantity_sold = updateFields.quantity_sold ?? product.quantity_sold ;
      product.quantity_inventory = updateFields.quantity_inventory ?? product.quantity_inventory;
      product.status = updateFields.status ?? product.status;
      product.delete_At = updateFields.delete_At ? new Date(updateFields.delete_At) : product.delete_At;
      product.brand = updateFields.brand ?? product.brand;
      product.category = updateFields.category ?? product.category;
      product.price = updateFields.price ?? product.price;
      product.description = updateFields.description ?? product.description;
      product.image = updateFields.image ?? product.image;
      product.sku = updateFields.sku ?? product.sku;
    }
    return await this.productRepository.save(product);
  }
  
  
  // Xóa sản phẩm theo ID
  async deleteProduct(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.delete_At = new Date();
    product.status = 'stop business'; // Đặt giá trị ngày giờ hiện tại cho trường delete_At
    await this.productRepository.save(product);
    throw new NotFoundException('Delete Product Succesfull');
  }
}


