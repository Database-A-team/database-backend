import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from '../../common/entities/core.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { Movie } from './movie.entity';
import { Screen } from 'src/screens/entities/screen.entity';

@InputType('ReleasedMovieInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class ReleasedMovie extends CoreEntity {
  @OneToOne((type) => Movie, { onDelete: 'CASCADE' })
  @JoinColumn()
  movie: Movie;

  @Field((type) => [Screen], { nullable: true })
  @ManyToMany((type) => Screen, (screen) => screen.releasedMovies, {
    nullable: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  screens?: Screen[];
}
