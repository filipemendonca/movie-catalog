import { CatalogDto } from './catalog.dto';

export class CatalogListDto {
  public catalog: CatalogDto[];
  public count: number;
  public lastId?: number;
}
