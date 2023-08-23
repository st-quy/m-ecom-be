import { Category } from "src/modules/category/entities";
import { Products } from "../entities";
Products
export class UpdateProductDTO {
    product_name: string;
    brand: string;
    price: number;
    description: string;
    image: string;
    product_availability: string;
    sku: number;
    quantity_sold: number;
    quantity_inventory: number; 
    status: string;
    delete_At: Date;
    category: Category ;
}