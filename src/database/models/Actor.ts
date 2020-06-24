import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Entity } from 'typeorm';

import { Movie } from '.';
import BaseModel from './BaseModel';

@Entity({ name: 'actors' })
export default class Actor extends BaseModel<Actor> {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @ManyToOne(() => Movie, (movie) => movie.actors)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;
}
