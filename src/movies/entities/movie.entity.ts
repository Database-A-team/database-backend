import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  RelationId,
} from 'typeorm';
import { Genre } from './genre.entity';
import { ReleasedMovie } from './released-movie.entity';

@InputType('MovieInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Movie extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  movieImage: string;

  @Field((type) => Genre, { nullable: true })
  @ManyToOne((type) => Genre, (genre) => genre.movies, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  genre: Genre;

  @Field((type) => User)
  @ManyToMany((type) => User, (user) => user.favMovies, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  favUser: User;

  @Field((type) => String)
  @Column()
  director: string;

  @Field((type) => String)
  @Column()
  rating: string;

  @Field((type) => String)
  @Column()
  actor: string;

  @Field((type) => Date)
  @Column()
  openDate: Date;

  @Field((type) => String)
  @Column()
  info: string;

  @Field((type) => String)
  @Column()
  duration: string;

  @Field((type) => ReleasedMovie)
  @OneToOne((type) => ReleasedMovie, (releasedMovie) => releasedMovie.movie, {
    nullable: true,
  })
  released?: ReleasedMovie;

  @Field((type) => Boolean)
  @Column({ default: false })
  isPromoted: boolean;

  @Field((type) => Date, { nullable: true })
  @Column({ nullable: true })
  promotedUntil: Date;
}
