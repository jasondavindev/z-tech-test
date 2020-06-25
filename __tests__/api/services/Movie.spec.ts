import { populateMovie, buildMovie } from 'test/factories/Movie';
import cleanTables from 'test/helpers/Database';
import Container from 'typedi';
import { Connection } from 'typeorm';

import TypeORMLoader from '@/loaders/Typeorm';
import { Movie } from '@models/index';
import MovieService from '@services/Movie';

describe('services/Movie', () => {
  let connection: Connection;
  let service: MovieService;

  beforeAll(async () => {
    connection = await TypeORMLoader();
    service = Container.get(MovieService);
  });

  afterAll(async () => {
    await cleanTables(connection, [Movie]);
    return connection.close();
  });

  describe('#create', () => {
    describe('when already exists a movie with same name', () => {
      it('throws an error', async () => {
        await populateMovie(1, { name: 'Test' } as Movie);

        const movie = buildMovie({ name: 'Test' } as Movie);
        expect(service.create(movie)).rejects.toThrowError();
      });
    });

    describe('when the movie is ok', () => {
      it('creates the movie', async () => {
        const movie = buildMovie({ name: 'New Test' } as Movie);
        expect(service.create(movie)).resolves.toBeDefined();
      });
    });
  });
});
