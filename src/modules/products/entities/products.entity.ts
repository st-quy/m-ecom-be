// products.entity.ts
import { Carts } from 'src/modules/carts/entities/carts.entity';
import { CartsProducts } from 'src/modules/carts/entities/carts_products.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';


@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_name: string;

    @Column()
    price: number;

    @Column()
    image: string; // You can adjust this based on your requirements

    @Column()
    description: string;

    @Column()
    status: string;

    @Column()
    stock: string;


    @Column()
    brand: string;


    @Column()
    delete_At: string;

    @Column()
    quantity_sold: number;

    @Column()
    quantity_inventory: number;

    @Column()
    sku: string;



    @ManyToMany(() => Carts, cart => cart.product)
    cart: Carts[]

    @OneToMany(() => CartsProducts, cartsProduct => cartsProduct.product)
    cartsProducts: CartsProducts[];

    @ManyToOne(() => Category, category => category.products)
    category: Category;

}



