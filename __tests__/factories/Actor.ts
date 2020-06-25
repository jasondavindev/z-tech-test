import faker from 'faker';
import { getRepository } from 'typeorm';

import Actor from '@models/Actor';

export function buildActor(data?: Actor): Actor {
  const actor = new Actor({
    name: faker.name.jobTitle(),
    movies: []
  });

  if (data) Object.assign(actor, data);

  return actor;
}

export async function createActor(data?: Actor): Promise<Actor> {
  const actor = buildActor();

  if (data) Object.assign(actor, data);

  return actor;
}

export async function populateActor(qty: number, data?: Actor): Promise<Actor[]> {
  const actors = Array(qty).fill(data).map(createActor);

  return getRepository(Actor).save<Actor>(await Promise.all(actors));
}
