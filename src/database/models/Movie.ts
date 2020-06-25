import { IsEnum, IsString, IsNotEmpty, IsArray, ArrayMaxSize, IsDateString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

import CensorshipLevel from '@/types/CensorshipLevel';

import { Actor } from '.';
import BaseModel from './BaseModel';

@Entity({ name: 'movies' })
export default class Movie extends BaseModel<Movie> {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDateString()
  @Column({ name: 'release_date' })
  releaseDate: string;

  @IsEnum(CensorshipLevel)
  @Column({ name: 'censorship_level' })
  censorshipLevel: string;

  @ArrayMaxSize(10, { message: 'a movie can have a maximum of ten actors' })
  @IsArray()
  @ManyToMany(() => Actor, (actor) => actor.movies, { eager: true })
  @JoinTable({
    name: 'movie_actors',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' }
  })
  actors?: Actor[];
}
