import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { Budget } from 'src/budgets/budgets.entity';
import { Response } from 'express';
import { ApiResponse } from '../models/response.model';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Get()
  async getBudgets(): Promise<ApiResponse<Budget[]>> {
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

  @Post()
  async createBudget(
    @Res({ passthrough: true }) response: Response,
    @Body() budget: Budget,
  ): Promise<ApiResponse<Budget>> {
    const createdBudget: Budget = await this.budgetsService.upsert(budget);

    response.status(HttpStatus.CREATED);

    return {
      status: HttpStatus.CREATED,
      data: createdBudget,
    };
  }

  @Put(':id')
  async updateBudget(
    @Res({ passthrough: true }) response: Response,
    @Body() budget: Budget,
    @Param('id') id: string,
  ): Promise<ApiResponse<Budget>> {
    const createdBudget: Budget = await this.budgetsService.upsert({
      ...budget,
      id,
    });

    response.status(HttpStatus.ACCEPTED);

    return {
      status: HttpStatus.ACCEPTED,
      data: createdBudget,
    };
  }

  @Delete(':id')
  async deleteBudget(
    @Res({ passthrough: true }) response: Response,
    @Param('id') id: string,
  ): Promise<ApiResponse<boolean>> {
    const budget: Budget | null = await this.budgetsService.findById(id);

    if (budget === null) {
      response.status(HttpStatus.NOT_FOUND);

      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Budget not found with id: ' + id,
      };
    }

    await this.budgetsService.remove(id);

    response.status(HttpStatus.ACCEPTED);

    return {
      status: HttpStatus.ACCEPTED,
      data: true,
    };
  }
}
