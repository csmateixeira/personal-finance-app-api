import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { POTS_REPOSITORY } from '../utils/values';
import { Pot } from './pots.entity';

@Injectable()
export class PotsService {
  constructor(
    @Inject(POTS_REPOSITORY)
    private potsRepository: Repository<Pot>,
  ) {}

  findAll(): Promise<Pot[]> {
    return this.potsRepository.find();
  }

  findByName(name: string): Promise<Pot | null> {
    return this.potsRepository.findOneBy({ name });
  }
}
