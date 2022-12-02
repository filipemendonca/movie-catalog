import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CatalogEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 500 })
  public title: string;

  @Column()
  public banner: string;

  @Column()
  public description: string;

  @Column({ length: 250 })
  public director: string;

  @Column({ length: 250 })
  public producer: string;
}
