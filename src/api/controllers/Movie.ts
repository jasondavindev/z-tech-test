import { Response } from 'express';
import { CREATED, BAD_REQUEST } from 'http-status-codes';
import { JsonController, Post, BodyParam, Res, HttpError } from 'routing-controllers';
import Container from 'typedi';

import { Movie } from '@models/index';
import MovieService from '@services/Movie';

@JsonController('/v1/movies')
export default class MovieController {
  private movieService: MovieService;

  constructor() {
    this.movieService = Container.get(MovieService);
  }

  @Post('/')
  async create(
    @BodyParam('movie', { validate: true }) movie: Movie,
    @Res() res: Response
  ): Promise<Response> {
    const createdMovie = await this.movieService.create(movie);

    if (!createdMovie) throw new HttpError(BAD_REQUEST, 'Movie not created');

    return res.sendStatus(CREATED);
  }
}
