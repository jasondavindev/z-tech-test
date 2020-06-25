import { IsEnum, IsString, IsNotEmpty, IsArray, ArrayMaxSize, IsDateString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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
  @OneToMany(() => Actor, (actor) => actor.movie)
  actors?: Actor[];
}
