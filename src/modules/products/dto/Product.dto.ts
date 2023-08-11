import { Category } from "src/modules/category/entities";

export class ProductDTO {
    id: number;
    product_name: string;
    brand: string;
    category: string;
    price: number;
    description: string;
    image: string;
    sku: number;
    quantity_sold: number;
    quantity_inventory: number; 
    status: string;
    deleteAt: Date;
}