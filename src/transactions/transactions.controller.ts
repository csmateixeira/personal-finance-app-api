import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../models/response.model';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transactions.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getTransactions(): Promise<ApiResponse<Transaction>> {
    return {
      status: HttpStatus.OK,
      data: await this.transactionsService.findAll(),
    };
  }

  @Get(':category')
  async getTransactionsByCategory(
    @Param('category') category: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ApiResponse<Transaction>> {
    const transactions: Transaction[] =
      await this.transactionsService.findByCategory(category);

    if (transactions === null || transactions.length === 0) {
      response.status(HttpStatus.NOT_FOUND);

      return {
        status: HttpStatus.NOT_FOUND,
        message: 'No transactions found with category: ' + category,
      };
    }

    response.status(HttpStatus.OK);

    return {
      status: HttpStatus.OK,
      data: transactions,
    };
  }
}
