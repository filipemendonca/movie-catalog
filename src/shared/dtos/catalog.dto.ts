import { IsNotEmpty } from 'class-validator';

export class CatalogDto {
  @IsNotEmpty({ message: 'Title is required.' })
  public title: string;

  @IsNotEmpty({ message: 'Banner is required.' })
  public banner: string;

  public description?: string;

  public director?: string;

  public producer?: string;
}
