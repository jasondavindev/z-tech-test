import { Application } from 'express';
import { BAD_REQUEST, CREATED } from 'http-status-codes';
import request from 'supertest';
import { createActor } from 'test/factories/Actor';
import { buildMovie } from 'test/factories/Movie';
import cleanTables from 'test/helpers/Database';
import Container from 'typedi';
import { Connection } from 'typeorm';

import ExpressLoader from '@/loaders/Express';
import TypeORMLoader from '@/loaders/Typeorm';
import { Movie } from '@models/index';
import MovieService from '@services/Movie';

describe('controller/Movie', () => {
  let connection: Connection;
  let service: MovieService;
  let app: Application;

  beforeAll(async () => {
    connection = await TypeORMLoader();
    app = ExpressLoader();
    service = Container.get(MovieService);
  });

  afterAll(async () => {
    await cleanTables(connection, [Movie]);
    return connection.close();
  });

  describe('POST /movies', () => {
    describe('when has more than 10 actors', () => {
      it('throws an error and returns BAD_REQUEST', async () => {
        const actors = await Promise.all(Array(11).fill(createActor));
        const movie = buildMovie({ actors } as Movie);

        await request(app).post('/api/v1/movies').send({ movie }).expect(BAD_REQUEST);
      });
    });

    describe('when has 10 actors or less', () => {
      it('returns CREATED', async () => {
        const actors = await Promise.all(Array(10).fill(createActor));
        const movie = buildMovie({ actors } as Movie);

        await request(app).post('/api/v1/movies').send({ movie }).expect(CREATED);
      });
    });
  });
});
