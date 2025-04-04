import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Budget } from './budgets.entity';

@Injectable()
export class BudgetsService {
  constructor(
    @Inject('BUDGETS_REPOSITORY')
    private budgetsRepository: Repository<Budget>,
  ) {}

  findAll(): Promise<Budget[]> {
    return this.budgetsRepository.find();
  }

  findByCategory(category: string): Promise<Budget | null> {
    return this.budgetsRepository.findOneBy({ category });
  }
}
