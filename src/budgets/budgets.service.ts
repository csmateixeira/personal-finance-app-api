import { Injectable, Inject } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Budget } from './budgets.entity';
import { BUDGETS_REPOSITORY } from '../utils/values';

@Injectable()
export class BudgetsService {
  constructor(
    @Inject(BUDGETS_REPOSITORY)
    private budgetsRepository: Repository<Budget>,
  ) {}

  findAll(): Promise<Budget[]> {
    return this.budgetsRepository.find();
  }

  findByCategory(category: string): Promise<Budget | null> {
    return this.budgetsRepository.findOneBy({ category });
  }

  findById(id: string): Promise<Budget | null> {
    return this.budgetsRepository.findOneBy({ id });
  }

  upsert(budget: Budget): Promise<Budget> {
    return this.budgetsRepository.save(budget);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.budgetsRepository.delete(id);
  }
}
