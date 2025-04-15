import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { TransactionsController } from '../src/transactions/transactions.controller';
import { TransactionsService } from '../src/transactions/transactions.service';
import { ApiResponse } from '../src/models/response.model';
import { transactions } from './test-data';
import { Transaction } from 'src/transactions/transactions.entity';

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let service: TransactionsService;

  const mockResponse: any = { status: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        TransactionsService,
        {
          provide: 'TRANSACTIONS_REPOSITORY',
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
    service = module.get<TransactionsService>(TransactionsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getTransactions', () => {
    it('should return all transactions', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(transactions);

      const result: ApiResponse<Transaction[]> =
        await controller.getTransactions();

      expect(result).toEqual({
        status: HttpStatus.OK,
        data: transactions,
      });

      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('getTransactionsByCategory', () => {
    it('should return transactions by category', async () => {
      jest
        .spyOn(service, 'findByCategory')
        .mockResolvedValue([transactions[0]]);

      const result: ApiResponse<Transaction[]> =
        await controller.getTransactionsByCategory(mockResponse, 'Food');

      expect(result).toEqual({
        status: HttpStatus.OK,
        data: [transactions[0]],
      });

      expect(service.findByCategory).toHaveBeenCalledWith('Food');
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    });

    it('should return NOT_FOUND if no transactions are found', async () => {
      jest.spyOn(service, 'findByCategory').mockResolvedValue([]);

      const result = await controller.getTransactionsByCategory(
        mockResponse,
        'Nonexistent',
      );

      expect(result).toEqual({
        status: HttpStatus.NOT_FOUND,
        message: 'No transactions found with category: Nonexistent',
      });

      expect(service.findByCategory).toHaveBeenCalledWith('Nonexistent');
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    });
  });
});
