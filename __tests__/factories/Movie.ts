import faker from 'faker';

import CensorshipLevel from '@/types/CensorshipLevel';
import Movie from '@models/Movie';

export default function buildMovie(data?: Movie): Movie {
  const movie = new Movie({
    releaseDate: faker.date.past(),
    censorshipLevel: CensorshipLevel.Censored
  });

  if (data) Object.assign(movie, data);

  return movie;
}
