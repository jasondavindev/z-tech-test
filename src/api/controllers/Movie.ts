import { Response } from 'express';
import { CREATED } from 'http-status-codes';
import { JsonController, Post, BodyParam, Res } from 'routing-controllers';

import { Movie } from '@models/index';

@JsonController('/v1/movies')
export default class MovieController {
  @Post('/')
  create(@BodyParam('movie', { validate: true }) movie: Movie, @Res() res: Response): Response {
    return res.sendStatus(CREATED);
  }
}
