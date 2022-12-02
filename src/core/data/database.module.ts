import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { catalogProviders } from './providers/catalog.provider';

@Module({
  providers: [...databaseProviders, ...catalogProviders],
  exports: [...databaseProviders, ...catalogProviders],
})
export class DatabaseModule {}
