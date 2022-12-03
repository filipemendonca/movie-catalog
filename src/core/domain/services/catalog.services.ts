import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CatalogTypeOrmRepository } from '../../../core/data/repository/catalog.typeorm.repository';
import { CatalogDto } from '../../../shared/dtos/catalog.dto';
import { Search } from '../../../shared/interfaces/movies.dto';
import { CatalogCreateMapper } from '../mappers/catalog.mapper';
import { firstValueFrom } from 'rxjs';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CatalogServices {
  constructor(
    private readonly repository: CatalogTypeOrmRepository,
    private readonly httpService: HttpService,
  ) {}

  async create(catalogDto: CatalogDto): Promise<void> {
    const catalog = new CatalogCreateMapper().mapFrom(catalogDto);
    await this.repository.create(catalog);
  }

  async findAllFromApi(title: string): Promise<Search> {
    const url = `http://www.omdbapi.com/?apikey=9ea12e39&plot=full&s=${title}&page=1`;

    const { data } = await firstValueFrom(this.httpService.get<Search>(url));

    return data;
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<CatalogDto>> {
    const queryBuilder =
      this.repository.catalogTypeOrmRepository.createQueryBuilder('c');
    queryBuilder.select(['c.id', 'c.title', 'c.banner']);
    queryBuilder.orderBy('c.id', 'ASC');

    return paginate<CatalogDto>(queryBuilder, options);
  }
}
