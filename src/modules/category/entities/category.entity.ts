// payment.entity.ts
import { Products } from 'src/modules/products/entities/products.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';


@Entity()
export class Category {
  map(arg0: (category: any) => { id: any; category_name: any; }) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_name: string;

  @OneToMany(() => Products, product => product.category , {nullable:true})
  products: Products[];
}