import { Budget } from '../src/budgets/budgets.entity';
import { DeleteResult } from 'typeorm';

export const budget: Budget = {
  id: '1',
  category: 'Food',
  maximum: 500,
  theme: 'default',
};

export const mockDeleteResult: DeleteResult = { affected: 1, raw: [] };
