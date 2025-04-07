import { Controller, Get } from '@nestjs/common';
import { Public } from './utils/values';

@Controller()
export class AppController {
  @Public()
  @Get()
  status(): string {
    return 'up';
  }
}
