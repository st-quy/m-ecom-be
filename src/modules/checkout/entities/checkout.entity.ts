// checkout.entity.ts
import { Carts } from 'src/modules/carts/entities/carts.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,OneToOne ,JoinColumn} from 'typeorm';

@Entity()
export class Checkout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date_of_payment: Date;

  @Column()
  Recipient_name: string;

  @Column()
  delivery_address: string;

  @Column()
  Recipient_phone: string;

  @ManyToOne(() => Carts, cart => cart.checkouts)
  cart: Carts;

  @OneToOne(() => Payment,payment=>payment.checkout)
  @JoinColumn()
  payment: Payment;

}
