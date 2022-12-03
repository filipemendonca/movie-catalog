import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CatalogTypeOrmRepository } from 'src/core/data/repository/catalog.typeorm.repository';
import { CatalogDto } from 'src/shared/dtos/catalog.dto';
import { Search } from '../../../shared/interfaces/movies.dto';
import { CatalogCreateMapper } from '../mappers/catalog.mapper';
import { firstValueFrom } from 'rxjs';
import { CatalogListDto } from 'src/shared/dtos/catalog.list.dto';

@Injectable()
export class CatalogServices {
  constructor(
    private readonly repository: CatalogTypeOrmRepository,
    private readonly httpService: HttpService,
  ) {}

  async getAll(pageLimit: number, lastId?: number): Promise<CatalogListDto> {
    const catalogListDto = new CatalogListDto();
    const array = await this.repository.getAll(pageLimit, lastId);

    catalogListDto.catalog = array;

    const lastIndex = catalogListDto.catalog.length - 1;

    catalogListDto.count = await this.repository.getAllCountRegisters();
    catalogListDto.lastId = catalogListDto.catalog?.slice(
      lastIndex,
      pageLimit,
    )?.[0]?.id;

    return catalogListDto;
  }

  async create(catalogDto: CatalogDto): Promise<void> {
    const catalog = new CatalogCreateMapper().mapFrom(catalogDto);
    await this.repository.create(catalog);
  }

  async findAllFromApi(page: string, title: string): Promise<Search> {
    const url = `http://www.omdbapi.com/?apikey=9ea12e39&plot=full&s=${title}&page=${page}`;

    const { data } = await firstValueFrom(this.httpService.get<Search>(url));

    return data;
  }
}
