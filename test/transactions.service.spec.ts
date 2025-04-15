import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { TransactionsService } from '../src/transactions/transactions.service';
import { Transaction } from 'src/transactions/transactions.entity';
import { transactions } from './test-data';
import { TRANSACTIONS_REPOSITORY } from '../src/utils/values';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let repository: Repository<Transaction>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: TRANSACTIONS_REPOSITORY,
          useValue: {
            find: jest.fn(),
            findBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    repository = module.get<Repository<Transaction>>(TRANSACTIONS_REPOSITORY);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return all transactions', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue(transactions);

      const result: Transaction[] = await service.findAll();

      expect(result).toEqual(transactions);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findByCategory', () => {
    it('should return transactions by category', async () => {
      jest.spyOn(repository, 'findBy').mockResolvedValue([transactions[0]]);

      const result: Transaction[] = await service.findByCategory('Food');

      expect(result).toEqual([transactions[0]]);
      expect(repository.findBy).toHaveBeenCalledWith({ category: 'Food' });
    });

    it('should return an empty array if no transactions are found', async () => {
      jest.spyOn(repository, 'findBy').mockResolvedValue([]);

      const result: Transaction[] = await service.findByCategory('Nonexistent');

      expect(result).toEqual([]);
      expect(repository.findBy).toHaveBeenCalledWith({
        category: 'Nonexistent',
      });
    });
  });
});
