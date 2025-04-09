import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { budgetsProvider } from './budgets.provider';
import { BudgetsService } from './budgets.service';
import { BudgetsController } from './budgets.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...budgetsProvider, BudgetsService],
  controllers: [BudgetsController],
})
export class BudgetsModule {}
