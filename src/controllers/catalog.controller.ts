import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CONSTANTS } from 'src/core/data/constants/constants';
import { CatalogServices } from 'src/core/domain/services/catalog.services';
import { CatalogDto } from 'src/shared/dtos/catalog.dto';
import { CatalogListDto } from 'src/shared/dtos/catalog.list.dto';

@Controller(CONSTANTS.ROUTES.CATALOG.MAIN)
export class CatalogController {
  constructor(private catalogService: CatalogServices) {}

  @Get(CONSTANTS.ROUTES.CATALOG.GET_ALL_FROM_DB + '/:pageLimit' + '/:lastId?')
  async getAllFromDb(
    @Param('pageLimit') pageLimit: number,
    @Param('lastId') lastId = 1,
  ): Promise<CatalogListDto> {
    return await this.catalogService.getAll(pageLimit, lastId);
  }

  @Post(CONSTANTS.ROUTES.CATALOG.POST_UPDATE_WITH_ALL_CATALOGS + '?')
  async updateDbWithNewCatalogs(
    @Query('page') page: string,
    @Query('title') title: string,
  ): Promise<void> {
    const catalogsFromApi = await this.catalogService.findAllFromApi(
      page,
      title,
    );

    catalogsFromApi.Search.forEach(async (item) => {
      const catalogDto = new CatalogDto();

      catalogDto.title = item.Title;
      catalogDto.banner = item.Poster;

      await this.catalogService.create(catalogDto);
    });
  }
}
