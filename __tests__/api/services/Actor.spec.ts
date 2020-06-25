import { populateActor } from 'test/factories/Actor';
import cleanTables from 'test/helpers/Database';
import Container from 'typedi';
import { Connection } from 'typeorm';

import TypeORMLoader from '@/loaders/Typeorm';
import { Actor } from '@models/index';
import ActorRepository from '@repositories/Actor';
import ActorService from '@services/Actor';

describe('services/Actor', () => {
  let connection: Connection;
  let service: ActorService;

  beforeAll(async () => {
    connection = await TypeORMLoader();
    service = Container.get(ActorService);
  });

  afterAll(async () => {
    await cleanTables(connection, [Actor]);
    return connection.close();
  });

  describe('#findOrCreateList', () => {
    describe('when a non-existent actor is passed', () => {
      it('creates the actor', async () => {
        const spy = jest.spyOn(ActorRepository.prototype, 'save');
        const actor = { name: 'Batman' } as Actor;

        const [data] = await service.findOrCreateList([actor]);
        expect(spy).toHaveBeenCalled();
        expect(data).toHaveProperty('id');
      });
    });

    describe('when a existent actor is passed', () => {
      it('just list the actor', async () => {
        const spy = jest.spyOn(ActorRepository.prototype, 'save');
        const [actor] = await populateActor(1);

        const [data] = await service.findOrCreateList([actor]);
        expect(spy).not.toHaveBeenCalled();
        expect(data).toHaveProperty('id');
      });
    });
  });
});
