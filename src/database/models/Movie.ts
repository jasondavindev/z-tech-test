import { IsEnum, IsDate, IsString, IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import CensorshipLevel from '@/types/CensorshipLevel';

import BaseModel from './BaseModel';

@Entity({ name: 'movies' })
export default class Movie extends BaseModel<Movie> {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDate()
  @Column({ name: 'release_date' })
  releaseDate: Date;

  @IsEnum(CensorshipLevel)
  @Column({ name: 'censorship_level' })
  censorshipLevel: string;
}
