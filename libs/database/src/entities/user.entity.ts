import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Token } from './token.entity';

@Index('user_address_IDX', ['address'], { unique: true })
@Entity('user', { schema: 'bridge' })
export class User {
  @PrimaryColumn('varchar', { name: 'address', length: 100 })
  address: string;

  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @OneToMany(() => Token, (token) => token.userAddress2)
  tokens: Token[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
