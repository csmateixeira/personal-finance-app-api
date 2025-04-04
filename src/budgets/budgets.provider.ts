import { DataSource } from 'typeorm';
import { Budget } from './budgets.entity';
import { BUDGETS_REPOSITORY, DATA_SOURCE } from '../utils/values';

export const budgetProvider = [
  {
    provide: BUDGETS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Budget),
    inject: [DATA_SOURCE],
  },
];
