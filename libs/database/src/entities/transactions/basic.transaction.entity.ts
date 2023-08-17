import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('basic_transaction_txId_IDX', ['txId'], { unique: true })
@Entity('basic_transaction', { schema: 'bridge' })
export class BasicTransaction {
  @PrimaryColumn('varchar', { name: 'tx_id', length: 100 })
  txId: string;

  @Column('varchar', { name: 'from', length: 100 })
  from: string;

  @Column('varchar', { name: 'to', length: 100 })
  to: string;

  @Column('bigint', { name: 'balance', unsigned: true })
  balance: string;

  @Column('enum', {
    name: 'status',
    enum: ['Completed', 'Incomplete'],
    default: 'Incomplete',
  })
  status: 'Completed' | 'Incomplete';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
