import { CatalogEntity } from '../entities/catalog.entity';

export interface CatalogRepository {
  getAll(): Promise<CatalogEntity[]>;
  create(catalog: CatalogEntity): Promise<void>;
}
