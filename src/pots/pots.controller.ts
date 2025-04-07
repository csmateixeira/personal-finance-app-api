import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../models/response.model';
import { PotsService } from './pots.service';
import { Pot } from './pots.entity';

@Controller('pots')
export class PotsController {
  constructor(private readonly potsService: PotsService) {}

  @Get()
  async getPots(): Promise<ApiResponse<Pot>> {
    return {
      status: HttpStatus.OK,
      data: await this.potsService.findAll(),
    };
  }

  @Get(':name')
  async getPotByName(
    @Param('name') name: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ApiResponse<Pot>> {
    const pot: Pot | null = await this.potsService.findByName(name);

    if (pot === null) {
      response.status(HttpStatus.NOT_FOUND);

      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Pot not found with name: ' + name,
      };
    }

    response.status(HttpStatus.OK);

    return {
      status: HttpStatus.OK,
      data: pot,
    };
  }
}
