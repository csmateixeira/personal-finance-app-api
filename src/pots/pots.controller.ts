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

  @Post()
  async createPot(
    @Res({ passthrough: true }) response: Response,
    @Body() pot: Pot,
  ): Promise<ApiResponse<Pot>> {
    const createdPot: Pot = await this.potsService.upsert(pot);

    response.status(HttpStatus.CREATED);

    return {
      status: HttpStatus.CREATED,
      data: createdPot,
    };
  }

  @Put(':id')
  async updatePot(
    @Res({ passthrough: true }) response: Response,
    @Body() pot: Pot,
    @Param('id') id: string,
  ): Promise<ApiResponse<Pot>> {
    const createdPot: Pot = await this.potsService.upsert({
      ...pot,
      id,
    });

    response.status(HttpStatus.ACCEPTED);

    return {
      status: HttpStatus.ACCEPTED,
      data: createdPot,
    };
  }

  @Delete(':id')
  async deletePot(
    @Res({ passthrough: true }) response: Response,
    @Param('id') id: string,
  ): Promise<ApiResponse<boolean>> {
    const pot: Pot | null = await this.potsService.findById(id);

    if (pot === null) {
      response.status(HttpStatus.NOT_FOUND);

      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Pot not found with id: ' + id,
      };
    }

    await this.potsService.remove(id);

    response.status(HttpStatus.ACCEPTED);

    return {
      status: HttpStatus.ACCEPTED,
      data: true,
    };
  }
}
