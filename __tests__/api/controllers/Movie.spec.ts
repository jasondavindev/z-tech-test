import { Application } from 'express';
import { BAD_REQUEST, CREATED } from 'http-status-codes';
import request from 'supertest';
import { buildActor, populateActor } from 'test/factories/Actor';
import { buildMovie, populateMovie } from 'test/factories/Movie';
import cleanTables from 'test/helpers/Database';
import { Connection } from 'typeorm';

import ExpressLoader from '@/loaders/Express';
import TypeORMLoader from '@/loaders/Typeorm';
import CensorshipLevel from '@/types/CensorshipLevel';
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

  describe('GET /movies', () => {
    beforeEach(() => cleanTables(connection, [Movie]));

    describe('when is passed censorship level', () => {
      describe('and the level is valid', () => {
        it('the results is filtered by censorship level', async () => {
          await populateMovie(4, {
            censorshipLevel: CensorshipLevel.Censored
          } as Movie);

          await populateMovie(2, { censorshipLevel: CensorshipLevel.NotCensore } as Movie);

          const { body } = await request(app).get('/api/v1/movies?censorship=Censored');
          expect(body).toHaveLength(4);
        });
      });

      describe('and is invalid level', () => {
        it('the results is not filtered', async () => {
          await populateMovie(4, {
            censorshipLevel: CensorshipLevel.Censored
          } as Movie);

          await populateMovie(2, { censorshipLevel: CensorshipLevel.NotCensore } as Movie);

          const { body } = await request(app).get('/api/v1/movies?censorship=tam');
          expect(body).toHaveLength(6);
        });
      });
    });

    describe('when is not passed censorship level', () => {
      it('the results is not filtered', async () => {
        await populateMovie(4, {
          censorshipLevel: CensorshipLevel.Censored
        } as Movie);

        await populateMovie(2, { censorshipLevel: CensorshipLevel.NotCensore } as Movie);

        const { body } = await request(app).get('/api/v1/movies');
        expect(body).toHaveLength(6);
      });
    });
  });
});
