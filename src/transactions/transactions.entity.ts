import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'tinytext' })
  avatar: string;

  @Column({ type: 'tinytext' })
  name: string;

  @Column({ type: 'tinytext' })
  category: string;

  @Column({ type: 'varchar', length: 512 })
  date: string;

  @Column({ type: 'float' })
  amount: number;

  @Column({ type: 'boolean' })
  recurring: boolean;
}
