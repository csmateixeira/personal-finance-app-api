import { HttpStatus } from '@nestjs/common';

export interface ApiResponse<T> {
  status: HttpStatus;

  data?: T | T[];
  message?: string;
}
