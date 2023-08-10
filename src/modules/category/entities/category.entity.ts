// payment.entity.ts
import { Products } from 'src/modules/products/entities/products.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';


@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_name: string;

  @OneToMany(() => Products, product => product.category)
  products: Products[];
}