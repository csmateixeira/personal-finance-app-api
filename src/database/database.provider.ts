import { DataSource } from 'typeorm';
import { Environment } from '../models/environment';

export const databaseProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: Environment.DB_HOST,
        port: Environment.DB_PORT,
        username: Environment.DB_USERNAME,
        password: Environment.DB_PASSWORD,
        database: Environment.DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
