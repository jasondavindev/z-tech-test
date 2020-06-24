import { EntityRepository, Repository } from 'typeorm';

import Movie from '@models/Movie';

@EntityRepository(Movie)
export default class MovieRepository extends Repository<Movie> {}
