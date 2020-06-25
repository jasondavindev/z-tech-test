import { Response } from 'express';
import { CREATED, BAD_REQUEST } from 'http-status-codes';
import {
  JsonController,
  Post,
  BodyParam,
  Res,
  HttpError,
  Get,
  QueryParam
} from 'routing-controllers';
import Container from 'typedi';

import CensorshipLevel from '@/types/CensorshipLevel';
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

  @Get('/')
  async index(
    @QueryParam('censorship') censorshipLevelParam: CensorshipLevel,
      @QueryParam('page') page = 1
  ): Promise<Movie[]> {
    const filter = censorshipLevelParam in CensorshipLevel
      ? { censorshipLevel: CensorshipLevel[censorshipLevelParam] }
      : {};

    return this.movieService.find({ where: filter, ...this.buildPagination({ page }) });
  }

  private buildPagination({ page = 1, limit = 10 }: { page: number; limit?: number }) {
    const skip = ((page < 0 ? 1 : page) - 1) * limit;
    return { take: limit, skip };
  }
}
