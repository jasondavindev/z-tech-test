import faker from 'faker';
import { getRepository } from 'typeorm';

import CensorshipLevel from '@/types/CensorshipLevel';
import Movie from '@models/Movie';

import { buildActor } from './Actor';

export function buildMovie(data?: Movie): Movie {
  const movie = new Movie({
    name: faker.name.jobTitle(),
    releaseDate: faker.date.past().toISOString(),
    censorshipLevel: CensorshipLevel.Censored,
    actors: [
      buildActor()
    ]
  });

  if (data) Object.assign(movie, data);

  return movie;
}

export async function populateMovie(qty: number, data?: Movie): Promise<Movie[]> {
  const movies = Array(qty).fill(data).map(buildMovie);

  return getRepository(Movie).save<Movie>(await Promise.all(movies));
}
