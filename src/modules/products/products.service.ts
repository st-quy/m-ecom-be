import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities';
import { Brackets, Repository } from 'typeorm';
import { getProductsDto } from './dto/getProductsDto.dto';


@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,

  ) { }

  async searchProducts(searchDto: getProductsDto): Promise<Products[]> {
    const query = this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.delete_At IS NULL')
      .andWhere('product.status = :status', { status: 'on' })

    if (searchDto.productName) {
      query.andWhere('LOWER(product.product_name) LIKE LOWER(:productName)', { productName: `%${searchDto.productName}%` });
    }

    if (searchDto.categoryId !== undefined) {
      query.andWhere('category.id = :categoryId', { categoryId: searchDto.categoryId });
    }

    if (searchDto.sortByPrice) {
      query.orderBy('product.price', searchDto.sortByPrice);
    }

    if (searchDto.sortByQuantitySold) {
      query.orderBy('product.quantity_sold', searchDto.sortByQuantitySold);
    }

    return query.getMany();
  }
}
