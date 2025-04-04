import { DataSource } from 'typeorm';
import { Budget } from '../entities/budgets.entity';

export const budgetProvider = [
  {
    provide: 'BUDGETS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Budget),
    inject: ['DATA_SOURCE'],
  },
];
