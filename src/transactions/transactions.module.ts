import { Module } from '@nestjs/common';
import { transactionsProvider } from './transactions.provider';
import { TransactionsController } from './transactions.controller';
import { DatabaseModule } from '../database/database.module';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [DatabaseModule],
  providers: [...transactionsProvider, TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
