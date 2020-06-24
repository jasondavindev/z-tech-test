import { IsNotEmpty } from 'class-validator';
import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Entity } from 'typeorm';

import { Movie } from '.';
import BaseModel from './BaseModel';

@Entity({ name: 'actors' })
export default class Actor extends BaseModel<Actor> {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @IsNotEmpty()
  @ManyToOne(() => Movie, (movie) => movie.actors)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;
}
