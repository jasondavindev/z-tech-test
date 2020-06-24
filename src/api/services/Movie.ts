import { BAD_REQUEST } from 'http-status-codes';
import { HttpError } from 'routing-controllers';
import { Service } from 'typedi';
import { FindConditions, UpdateResult } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';

import Movie from '@models/Movie';
import MovieRepository from '@repositories/Movie';

@Service()
export default class MovieService {
  constructor(@OrmRepository() private repository: MovieRepository) {}

  public async create(movie: Movie): Promise<Movie | undefined> {
    const movieSameName = await this.findOne({ name: movie.name });

    if (movieSameName) throw new HttpError(BAD_REQUEST, 'Já existe um filme com este nome');

    return this.repository.save(movie);
  }

  public async findOne(options?: FindConditions<Movie>): Promise<Movie | undefined> {
    return this.repository.findOne(options);
  }

  public async findAll(options?: FindConditions<Movie>): Promise<Movie[]> {
    return this.repository.find(options);
  }

  public async update(movie: Movie, options?: FindConditions<Movie>): Promise<UpdateResult> {
    return this.repository.update(options, movie);
  }

  public async delete(options?: FindConditions<Movie>): Promise<UpdateResult> {
    return this.repository.softDelete(options);
  }
}
