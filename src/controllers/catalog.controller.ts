import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CONSTANTS } from 'src/core/data/constants/constants';
import { CatalogServices } from 'src/core/domain/services/catalog.services';
import { CatalogDto } from 'src/shared/dtos/catalog.dto';
import { SearchMoviesDto } from 'src/shared/dtos/searchMovies.dto';

@Controller(CONSTANTS.ROUTES.CATALOG.MAIN)
export class CatalogController {
  constructor(private catalogService: CatalogServices) {}

  @Get()
  @ApiTags('movies-catalog')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getAllPaginated(
    @Query('page') page = 1,
    @Query('limit') limit = 100,
  ): Promise<Pagination<CatalogDto>> {
    limit = limit > 100 ? 100 : limit;
    page = page < 1 ? 1 : page;
    return await this.catalogService.paginate({ page, limit });
  }

  @Post()
  @ApiTags('movies-catalog')
  @ApiBody({ type: SearchMoviesDto })
  async updateDbWithNewCatalogs(@Body() model: SearchMoviesDto): Promise<void> {
    if (model.title === undefined) {
      throw new HttpException('Title is required!', HttpStatus.FORBIDDEN);
    }

    const catalogsFromApi = await this.catalogService.findAllFromApi(
      model.title,
    );

    catalogsFromApi.Search?.forEach(async (item) => {
      const catalogDto = new CatalogDto();

      catalogDto.title = item.Title;
      catalogDto.banner = item.Poster;

      await this.catalogService.create(catalogDto);
    });
  }
}
