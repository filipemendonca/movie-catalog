import { CatalogEntity } from 'src/core/domain/entities/catalog.entity';
import { DataSource } from 'typeorm';
import { CONSTANTS } from '../constants/constants';

export const catalogProviders = [
  {
    provide: CONSTANTS.DB_REPOSITORIES.CATALOG_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CatalogEntity),
    inject: [CONSTANTS.DATA_SOURCE],
  },
];
