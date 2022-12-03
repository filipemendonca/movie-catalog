import { Test, TestingModule } from '@nestjs/testing';
import { Pagination } from 'nestjs-typeorm-paginate';
import { SearchMoviesDto } from '../shared/dtos/searchMovies.dto';
import { CatalogServices } from '../core/domain/services/catalog.services';
import { CatalogDto } from '../shared/dtos/catalog.dto';
import { CatalogController } from './catalog.controller';
import { Movies, Search } from '../shared/interfaces/movies.dto';

const catalogListMock: Pagination<CatalogDto> = {
  items: [
    {
      id: 312,
      title: 'Iron Man',
      banner:
        'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg',
    },
    {
      id: 313,
      title: 'Iron Man 3',
      banner:
        'https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_SX300.jpg',
    },
  ],
  meta: {
    totalItems: 10,
    itemCount: 10,
    itemsPerPage: 10,
    totalPages: 1,
    currentPage: 1,
  },
};

const searchMovies: Search = {
  Search: [
    {
      Title: 'Iron Man',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg',
    },
    {
      Title: 'Iron Man 3',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_SX300.jpg',
    },
  ],
};

describe('CatalogController', () => {
  let catalogController: CatalogController;
  let catalogServices: CatalogServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogController],
      providers: [
        {
          provide: CatalogServices,
          useValue: {
            paginate: jest.fn().mockResolvedValue(catalogListMock),
            findAllFromApi: jest.fn().mockResolvedValue(searchMovies),
            create: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    catalogController = module.get<CatalogController>(CatalogController);
    catalogServices = module.get<CatalogServices>(CatalogServices);
  });

  it('should be defined', () => {
    expect(catalogController).toBeDefined();
    expect(catalogServices).toBeDefined();
  });

  describe('getAllPaginated', () => {
    it('should return a paginated list from database', async () => {
      const result = await catalogController.getAllPaginated();

      expect(result).toEqual(catalogListMock);
      expect(typeof result).toEqual('object');
      expect(catalogServices.paginate).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(catalogServices, 'paginate')
        .mockRejectedValueOnce(new Error());

      expect(catalogController.getAllPaginated()).rejects.toThrowError();
    });
  });

  describe('updateDbWithNewCatalogs', () => {
    it('should search movies on external API and input data on database', async () => {
      const body: SearchMoviesDto = {
        title: 'batman',
      };

      const result = await catalogController.updateDbWithNewCatalogs(body);

      expect(result).toEqual(undefined);
      expect(catalogServices.findAllFromApi).toHaveBeenCalledTimes(1);
    });
  });
});
