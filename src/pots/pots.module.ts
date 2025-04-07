import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { potsProvider } from './pots.provider';
import { PotsService } from './pots.service';
import { PotsController } from './pots.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...potsProvider, PotsService],
  controllers: [PotsController],
})
export class PotsModule {}
