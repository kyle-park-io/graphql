import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Index('token_address_IDX', ['address'], { unique: true })
@Index('token_FK', ['userAddress'], {})
@Entity('token', { schema: 'bridge' })
export class Token {
  @PrimaryColumn('varchar', { name: 'address', length: 100 })
  address: string;

  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @Column('bigint', { name: 'balance', unsigned: true })
  balance: string;

  @Column('varchar', { name: 'user_address', length: 100 })
  userAddress: string;

  @ManyToOne(() => User, (user) => user.tokens, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_address', referencedColumnName: 'address' })
  userAddress2: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
