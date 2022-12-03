import { CatalogEntity } from '../entities/catalog.entity';

export interface CatalogRepository {
  getAll(pagelimit: number, lastId: number): Promise<CatalogEntity[]>;
  getAllCountRegisters(): Promise<number>;
  create(catalog: CatalogEntity): Promise<void>;
}
