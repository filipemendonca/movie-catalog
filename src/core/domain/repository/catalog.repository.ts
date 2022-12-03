import { CatalogEntity } from '../entities/catalog.entity';

export interface ICatalogRepository {
  getAllCountRegisters(): Promise<number>;
  create(catalog: CatalogEntity): Promise<void>;
}
