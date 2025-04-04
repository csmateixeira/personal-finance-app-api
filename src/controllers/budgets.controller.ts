import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { BudgetsService } from '../services/budgets.service';
import { Budget } from 'src/entities/budgets.entity';
import { Response } from 'express';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Get()
  getBudgets() {
    return this.budgetsService.findAll();
  }

  @Get(':category')
  async getBudgetByCategory(
    @Param('category') category: string,
    @Res() response: Response,
  ) {
    const budget: Budget | null =
      await this.budgetsService.findByCategory(category);

    if (!budget) {
      response
        .status(HttpStatus.NOT_FOUND)
        .send('Budget not found with category: ' + category);
    }

    response.status(HttpStatus.OK).send(budget);
  }
}
