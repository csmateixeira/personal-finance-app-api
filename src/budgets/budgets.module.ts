import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { budgetProvider } from './budgets.provider';
import { BudgetsService } from './budgets.service';
import { BudgetsController } from './budgets.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...budgetProvider, BudgetsService],
  controllers: [BudgetsController],
})
export class BudgetsModule {}
