import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pots')
export class Pot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'tinytext' })
  name: string;

  @Column({ type: 'float' })
  target: number;

  @Column({ type: 'float' })
  total: number;

  @Column({ type: 'tinytext' })
  theme: string;
}
