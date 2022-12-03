import { IsNotEmpty } from 'class-validator';

export class CatalogDto {
  constructor(catalogDto?: Partial<CatalogDto>) {
    this.id = catalogDto?.id ?? 1;
    this.title = catalogDto?.title ?? '';
    this.banner = catalogDto?.banner ?? '';
  }

  public id: number;

  @IsNotEmpty({ message: 'Title is required.' })
  public title: string;

  @IsNotEmpty({ message: 'Banner is required.' })
  public banner: string;

  public description?: string;

  public director?: string;

  public producer?: string;
}
