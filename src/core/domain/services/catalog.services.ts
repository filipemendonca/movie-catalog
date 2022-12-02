import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { HttpService } from '@nestjs/axios';
import { CatalogTypeOrmRepository } from 'src/core/data/repository/catalog.typeorm.repository';
import { CatalogDto } from 'src/shared/dtos/catalog.dto';
import { Search } from '../../../shared/interfaces/movies.dto';
import { CatalogCreateMapper } from '../mappers/catalog.mapper';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CatalogServices {
  constructor(
    private readonly repository: CatalogTypeOrmRepository,
    private readonly httpService: HttpService,
  ) {}

  async getAll(): Promise<CatalogDto[]> {
    return await this.repository.getAll();
  }

  async create(catalogDto: CatalogDto): Promise<void> {
    const catalog = new CatalogCreateMapper().mapFrom(catalogDto);
    await this.repository.create(catalog);
  }

  async findAllFromApi(page: string): Promise<Search> {
    const url = `http://www.omdbapi.com/?apikey=9ea12e39&plot=full&s=batman&page=${page}`;

    const { data } = await firstValueFrom(this.httpService.get<Search>(url));

    return data;
  }
}
