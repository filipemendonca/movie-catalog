import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatalogController } from './controllers/catalog.controller';
import { CatalogTypeOrmRepository } from './core/data/repository/catalog.typeorm.repository';
import { DatabaseModule } from './core/data/database.module';
import { CatalogServices } from './core/domain/services/catalog.services';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    DatabaseModule,
  ],
  controllers: [CatalogController],
  providers: [CatalogTypeOrmRepository, CatalogServices],
  exports: [CatalogServices],
})
export class AppModule {}
