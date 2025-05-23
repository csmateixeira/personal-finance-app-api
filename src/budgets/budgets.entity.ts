import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('budgets')
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'tinytext' })
  category: string;

  @Column({ type: 'float' })
  maximum: number;

  @Column({ type: 'tinytext' })
  theme: string;
}
