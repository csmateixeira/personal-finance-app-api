import { Test, TestingModule } from '@nestjs/testing';
import { BudgetsController } from '../src/budgets/budgets.controller';
import { BudgetsService } from '../src/budgets/budgets.service';
import { Budget } from '../src/budgets/budgets.entity';
import { budget } from './test-data';
import { ApiResponse } from '../src/models/response.model';
import { HttpStatus } from '@nestjs/common';
import { BUDGETS_REPOSITORY } from '../src/utils/values';
import { DeleteResult } from 'typeorm';

describe('BudgetsController', () => {
  let controller: BudgetsController;
  let service: BudgetsService;

  const mockBudgets: Budget[] = [budget];
  const mockResponse: any = { status: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BudgetsController,
        BudgetsService,
        { provide: BUDGETS_REPOSITORY, useValue: {} },
      ],
    }).compile();

    controller = module.get<BudgetsController>(BudgetsController);
    service = module.get<BudgetsService>(BudgetsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getBudgets', () => {
    it('should return all budgets', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockBudgets);

      const result: ApiResponse<Budget[]> = await controller.getBudgets();

      expect(result).toEqual({
        status: HttpStatus.OK,
        data: mockBudgets,
      });

      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('getBudgetByCategory', () => {
    it('should return a budget by category', async () => {
      jest.spyOn(service, 'findByCategory').mockResolvedValue(budget);

      const result: ApiResponse<Budget> = await controller.getBudgetByCategory(
        mockResponse,
        'Food',
      );

      expect(result).toEqual({
        status: HttpStatus.OK,
        data: budget,
      });

      expect(service.findByCategory).toHaveBeenCalledWith('Food');
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    });

    it('should return NOT_FOUND if no budget is found', async () => {
      jest.spyOn(service, 'findByCategory').mockResolvedValue(null);

      const result = await controller.getBudgetByCategory(
        mockResponse,
        'Nonexistent',
      );

      expect(result).toEqual({
        status: HttpStatus.NOT_FOUND,
        message: 'Budget not found with category: Nonexistent',
      });

      expect(service.findByCategory).toHaveBeenCalledWith('Nonexistent');
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    });
  });

  describe('createBudget', () => {
    it('should create a new budget', async () => {
      jest.spyOn(service, 'upsert').mockResolvedValue(budget);

      const result: ApiResponse<Budget> = await controller.createBudget(
        mockResponse,
        budget,
      );

      expect(result).toEqual({
        status: HttpStatus.CREATED,
        data: budget,
      });

      expect(service.upsert).toHaveBeenCalledWith(budget);
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    });
  });

  describe('updateBudget', () => {
    it('should update an existing budget', async () => {
      jest.spyOn(service, 'upsert').mockResolvedValue(budget);

      const result: ApiResponse<Budget> = await controller.updateBudget(
        mockResponse,
        budget,
        '1',
      );

      expect(result).toEqual({
        status: HttpStatus.ACCEPTED,
        data: budget,
      });

      expect(service.upsert).toHaveBeenCalledWith({ ...budget, id: '1' });
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.ACCEPTED);
    });
  });

  describe('deleteBudget', () => {
    it('should delete a budget by id', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(budget);
      jest
        .spyOn(service, 'remove')
        .mockResolvedValue({ affected: 1 } as DeleteResult);

      const result: ApiResponse<boolean> = await controller.deleteBudget(
        mockResponse,
        '1',
      );

      expect(result).toEqual({
        status: HttpStatus.ACCEPTED,
        data: true,
      });

      expect(service.findById).toHaveBeenCalledWith('1');
      expect(service.remove).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.ACCEPTED);
    });

    it('should return NOT_FOUND if budget does not exist', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(null);
      jest
        .spyOn(service, 'remove')
        .mockResolvedValue({ affected: 0 } as DeleteResult);

      const result = await controller.deleteBudget(mockResponse, '2');

      expect(result).toEqual({
        status: HttpStatus.NOT_FOUND,
        message: 'Budget not found with id: 2',
      });

      expect(service.findById).toHaveBeenCalledWith('2');
      expect(service.remove).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    });
  });
});
