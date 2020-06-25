import { IsNotEmpty } from 'class-validator';
import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable } from 'typeorm';

import { Movie } from '.';
import BaseModel from './BaseModel';

@Entity({ name: 'actors' })
export default class Actor extends BaseModel<Actor> {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.actors)
  movies?: Movie[];
}
