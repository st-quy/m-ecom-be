// get-products.dto.ts

import { IsEnum,IsOptional } from 'class-validator';
import { SortBy } from 'src/commons/constants/enum';


export class getProductsDto {
  productName: string;
    
  @IsOptional()
  @IsEnum(SortBy) // Sử dụng @IsEnum và truyền enum vào decorator
  sortByPrice;


  @IsOptional()
  @IsEnum(SortBy) // Sử dụng @IsEnum và truyền enum vào decorator
  sortByQuantitySold;

  categoryId: number;


}
