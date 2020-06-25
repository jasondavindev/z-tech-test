import { BAD_REQUEST } from 'http-status-codes';
import { HttpError } from 'routing-controllers';
import Container, { Service } from 'typedi';
import { FindConditions, FindManyOptions } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';

import Movie from '@models/Movie';
import MovieRepository from '@repositories/Movie';

import ActorService from './Actor';

@Service()
export default class MovieService {
  private actorService: ActorService;

  constructor(@OrmRepository() private repository: MovieRepository) {
    this.actorService = Container.get(ActorService);
  }

  public async create(movie: Movie): Promise<Movie | undefined> {
    if (await this.movieAlreadyExists(movie.name)) throw new HttpError(BAD_REQUEST, 'This movie already exists');

    await this.actorService.findOrCreateList(movie.actors);

    return this.repository.save(movie);
  }

  private async movieAlreadyExists(name: string): Promise<boolean> {
    const movie = await this.findOne({ name });
    return !!movie;
  }

  public async findOne(options?: FindConditions<Movie>): Promise<Movie | undefined> {
    return this.repository.findOne(options);
  }

  public async find(options?: FindManyOptions<Movie>): Promise<Movie[]> {
    return this.repository.find(options);
  }
}
