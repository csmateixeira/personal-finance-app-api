import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { budgetProvider } from './providers/budgets.provider';
import { BudgetsService } from './services/budgets.service';
import { BudgetsController } from './controllers/budgets.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...budgetProvider, BudgetsService],
  controllers: [BudgetsController],
})
export class BudgetsModule {}
