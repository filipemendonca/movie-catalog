import { Inject, Injectable } from '@nestjs/common';
import { CONSTANTS } from 'src/core/data/constants/constants';
import { Repository } from 'typeorm';
import { CatalogRepository } from '../../domain/repository/catalog.repository';
import { CatalogEntity } from '../../domain/entities/catalog.entity';

@Injectable()
export class CatalogTypeOrmRepository implements CatalogRepository {
  constructor(
    @Inject(CONSTANTS.DB_REPOSITORIES.CATALOG_REPOSITORY)
    private catalogTypeOrmRepository: Repository<CatalogEntity>,
  ) {}

  async getAllCountRegisters(): Promise<number> {
    return await this.catalogTypeOrmRepository.count();
  }

  async getAll(pageLimit: number, lastId?: number): Promise<CatalogEntity[]> {
    if (!!lastId) {
      return await this.catalogTypeOrmRepository.query(
        `SELECT * FROM catalog_entity WHERE id > ${lastId} LIMIT ${pageLimit}`,
      );
    } else {
      return await this.catalogTypeOrmRepository.query(
        `SELECT * FROM catalog_entity LIMIT ${pageLimit}`,
      );
    }
  }

  async create(catalog: CatalogEntity): Promise<void> {
    const model = this.catalogTypeOrmRepository.create(catalog);
    await this.catalogTypeOrmRepository.insert(model);
  }
}
