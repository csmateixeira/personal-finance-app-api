import { DataSource } from 'typeorm';
import { DATA_SOURCE, TRANSACTIONS_REPOSITORY } from '../utils/values';
import { Transaction } from './transactions.entity';

export const transactionsProvider = [
  {
    provide: TRANSACTIONS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Transaction),
    inject: [DATA_SOURCE],
  },
];
