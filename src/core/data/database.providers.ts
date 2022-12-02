import { DataSource } from 'typeorm';
import { CONSTANTS } from './constants/constants';

export const databaseProviders = [
  {
    provide: CONSTANTS.DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT
          ? parseInt(process.env.DATABASE_PORT)
          : 3306,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_SCHEMA,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: process.env.STATUS === CONSTANTS.ENV.DEV ? true : false,
      });

      return dataSource.initialize();
    },
  },
];
