import { Application } from 'express';
import { BAD_REQUEST, CREATED } from 'http-status-codes';
import request from 'supertest';
import { buildActor, populateActor } from 'test/factories/Actor';
import { buildMovie } from 'test/factories/Movie';
import cleanTables from 'test/helpers/Database';
import { Connection } from 'typeorm';

import ExpressLoader from '@/loaders/Express';
import TypeORMLoader from '@/loaders/Typeorm';
import { Movie, Actor } from '@models/index';

describe('controller/Movie', () => {
  let connection: Connection;
  let app: Application;

  beforeAll(async () => {
    connection = await TypeORMLoader();
    app = ExpressLoader();
  });

  afterAll(async () => {
    await cleanTables(connection, [Movie, Actor]);
    return connection.close();
  });

  describe('POST /movies', () => {
    describe('when has more than 10 actors', () => {
      it('throws an error and returns BAD_REQUEST', async () => {
        const actors = await Promise.all(Array(11).fill(null).map(buildActor));
        const movie = buildMovie({ actors } as Movie);

        await request(app).post('/api/v1/movies').send({ movie }).expect(BAD_REQUEST);
      });
    });

    describe('when has 10 actors or less', () => {
      it('returns CREATED', async () => {
        const [actor1] = await populateActor(2);
        const actor2 = buildActor();
        const movie = buildMovie({ actors: [actor1, actor2] } as Movie);

        await request(app).post('/api/v1/movies').send({ movie }).expect(CREATED);
      });
    });
  });
});
