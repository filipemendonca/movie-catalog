import { Inject, Injectable } from '@nestjs/common';
import { CONSTANTS } from 'src/core/data/constants/constants';
import { Repository } from 'typeorm';
import { ICatalogRepository } from '../../domain/repository/catalog.repository';
import { CatalogEntity } from '../../domain/entities/catalog.entity';

@Injectable()
export class CatalogTypeOrmRepository implements ICatalogRepository {
  constructor(
    @Inject(CONSTANTS.DB_REPOSITORIES.CATALOG_REPOSITORY)
    public catalogTypeOrmRepository: Repository<CatalogEntity>,
  ) {}

  async getAllCountRegisters(): Promise<number> {
    return await this.catalogTypeOrmRepository.count();
  }

  async create(catalog: CatalogEntity): Promise<void> {
    const model = this.catalogTypeOrmRepository.create(catalog);
    await this.catalogTypeOrmRepository.insert(model);
  }
}
