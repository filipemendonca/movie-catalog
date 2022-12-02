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

  async getAll(): Promise<CatalogEntity[]> {
    return await this.catalogTypeOrmRepository.find();
  }

  async create(catalog: CatalogEntity): Promise<void> {
    const model = this.catalogTypeOrmRepository.create(catalog);
    await this.catalogTypeOrmRepository.insert(model);
  }
}
