import { CatalogDto } from 'src/shared/dtos/catalog.dto';
import { CatalogEntity } from '../entities/catalog.entity';
import { Mapper } from './base/mapper.base';

export class CatalogCreateMapper extends Mapper<CatalogDto, CatalogEntity> {
  public mapFrom(data: CatalogDto): CatalogEntity {
    const catalog = new CatalogEntity();

    catalog.title = data.title;
    catalog.banner = data.banner;

    return catalog;
  }

  public mapTo(data: CatalogEntity): CatalogDto {
    const catalog = new CatalogDto();

    catalog.title = data.title;
    catalog.banner = data.banner;

    return catalog;
  }
}
