import { Transaction } from '../src/transactions/transactions.entity';
import { Budget } from '../src/budgets/budgets.entity';
import { DeleteResult } from 'typeorm';

export const budget: Budget = {
  id: '1',
  category: 'Food',
  maximum: 500,
  theme: 'default',
};

export const deleteResult: DeleteResult = { affected: 1, raw: [] };

export const transactions: Transaction[] = [
  {
    id: '1',
    category: 'Food',
    amount: 100,
    avatar: 'https://example.com/avatar1.png',
    date: '2023-01-01',
    name: 'Transaction 1',
    recurring: false,
  },
  {
    id: '2',
    category: 'Transport',
    amount: 50,
    avatar: 'https://example.com/avatar2.png',
    date: '2023-01-02',
    name: 'Transaction 2',
    recurring: true,
  },
];
