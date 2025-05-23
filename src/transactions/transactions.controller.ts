import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../models/response.model';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transactions.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getTransactions(): Promise<ApiResponse<Transaction[]>> {
    return {
      status: HttpStatus.OK,
      data: await this.transactionsService.findAll(),
    };
  }

  @Get(':category')
  async getTransactionsByCategory(
    @Res({ passthrough: true }) response: Response,
    @Param('category') category: string,
  ): Promise<ApiResponse<Transaction[]>> {
    const transactions: Transaction[] =
      await this.transactionsService.findByCategory(category);

    if (transactions.length === 0) {
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
