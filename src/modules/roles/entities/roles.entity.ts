//role.entity.ts
import { Users } from 'src/modules/users/entities/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameRole: string;

  @OneToOne(() => Users, user => user.role)
  user: Users;
}