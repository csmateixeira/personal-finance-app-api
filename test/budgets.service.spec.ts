import { Test, TestingModule } from '@nestjs/testing';
import { Repository, DeleteResult } from 'typeorm';
import { BudgetsService } from '../src/budgets/budgets.service';
import { Budget } from '../src/budgets/budgets.entity';
import { budget, mockDeleteResult } from './test-data';
import { BUDGETS_REPOSITORY } from '../src/utils/values';

describe('BudgetsService', () => {
  let service: BudgetsService;
  let repository: Repository<Budget>;

  const mockBudgets: Budget[] = [budget];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BudgetsService,
        {
          provide: BUDGETS_REPOSITORY,
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BudgetsService>(BudgetsService);
    repository = module.get<Repository<Budget>>(BUDGETS_REPOSITORY);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return all budgets', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue(mockBudgets);

      const result: Budget[] = await service.findAll();

      expect(result).toEqual(mockBudgets);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findByCategory', () => {
    it('should return a budget by category', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(budget);

      const result: Budget | null = await service.findByCategory('Food');

      expect(result).toEqual(budget);
      expect(repository.findOneBy).toHaveBeenCalledWith({ category: 'Food' });
    });

    it('should return null if no budget is found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      const result: Budget | null = await service.findByCategory('Nonexistent');

      expect(result).toBeNull();
      expect(repository.findOneBy).toHaveBeenCalledWith({
        category: 'Nonexistent',
      });
    });
  });

  describe('findById', () => {
    it('should return a budget by id', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(budget);

      const result: Budget | null = await service.findById('1');

      expect(result).toEqual(budget);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    });

    it('should return null if no budget is found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      const result: Budget | null = await service.findById('2');

      expect(result).toBeNull();
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '2' });
    });
  });

  describe('upsert', () => {
    it('should save and return the budget', async () => {
      jest.spyOn(repository, 'save').mockResolvedValue(budget);

      const result: Budget = await service.upsert(budget);

      expect(result).toEqual(budget);
      expect(repository.save).toHaveBeenCalledWith(budget);
    });
  });

  describe('remove', () => {
    it('should delete a budget by id and return the result', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue(mockDeleteResult);

      const result: DeleteResult = await service.remove('1');

      expect(result).toEqual(mockDeleteResult);
      expect(repository.delete).toHaveBeenCalledWith('1');
    });
  });
});
