import { DataSource } from 'typeorm';
import { DATA_SOURCE, POTS_REPOSITORY } from '../utils/values';
import { Pot } from './pots.entity';

export const potsProvider = [
  {
    provide: POTS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Pot),
    inject: [DATA_SOURCE],
  },
];
