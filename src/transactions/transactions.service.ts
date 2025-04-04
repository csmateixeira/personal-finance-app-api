import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TRANSACTIONS_REPOSITORY } from '../utils/values';
import { Transaction } from './transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(TRANSACTIONS_REPOSITORY)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  findAll(): Promise<Transaction[]> {
    return this.transactionsRepository.find();
  }

  findByCategory(category: string): Promise<Transaction[]> {
    return this.transactionsRepository.findBy({ category });
  }
}
