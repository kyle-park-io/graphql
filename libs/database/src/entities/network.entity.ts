import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('network_chainId_IDX', ['chainId'], { unique: true })
@Entity('network', { schema: 'bridge' })
export class Network {
  @PrimaryColumn('int', { name: 'chain_id' })
  chainId: number;

  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
