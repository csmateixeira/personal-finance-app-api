import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { BudgetsService } from '../services/budgets.service';
import { Budget } from 'src/entities/budgets.entity';
import { Response } from 'express';
import { ApiResponse } from '../models/response.model';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Get()
  async getBudgets(): Promise<ApiResponse<Budget>> {
    return {
      status: HttpStatus.OK,
      data: await this.budgetsService.findAll(),
    };
  }

  @Get(':category')
  async getBudgetByCategory(
    @Param('category') category: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ApiResponse<Budget>> {
    const budget: Budget | null =
      await this.budgetsService.findByCategory(category);

    if (budget === null) {
      response.status(HttpStatus.NOT_FOUND);

      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Budget not found with category: ' + category,
      };
    }

    response.status(HttpStatus.OK);

    return {
      status: HttpStatus.OK,
      data: budget,
    };
  }
}
