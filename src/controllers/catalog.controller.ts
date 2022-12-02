import { Controller, Get, Param, Post } from '@nestjs/common';
import { CONSTANTS } from 'src/core/data/constants/constants';
import { CatalogServices } from 'src/core/domain/services/catalog.services';
import { CatalogDto } from 'src/shared/dtos/catalog.dto';

@Controller(CONSTANTS.ROUTES.CATALOG.MAIN)
export class CatalogController {
  constructor(private catalogService: CatalogServices) {}

  @Get(CONSTANTS.ROUTES.CATALOG.GET_ALL_FROM_DB)
  async getAllFromDb(): Promise<CatalogDto[]> {
    return await this.catalogService.getAll();
  }

  @Post(CONSTANTS.ROUTES.CATALOG.POST_UPDATE_WITH_ALL_CATALOGS + '/:page')
  async updateDbWithNewCatalogs(@Param('page') page: string): Promise<void> {
    const catalogsFromApi = await this.catalogService.findAllFromApi(page);

    catalogsFromApi.Search.forEach(async (item) => {
      const catalogDto = new CatalogDto();

      catalogDto.title = item.Title;
      catalogDto.banner = item.Poster;

      await this.catalogService.create(catalogDto);
    });
  }
}
