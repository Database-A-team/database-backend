import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from '../../common/entities/core.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Movie } from './movie.entity';
import { Screen } from 'src/screens/entities/screen.entity';
import { Reservation } from 'src/reservations/entities/reservations.entity';

@InputType('TimeTableInputType', { isAbstract: true })
@ObjectType()
class TimeTable {
  @Field((type) => String)
  startTime: string;

  @Field((type) => String)
  endTime: string;
}

@InputType('ReleasedMovieInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class ReleasedMovie extends CoreEntity {
  @OneToOne((type) => Movie, { onDelete: 'CASCADE' })
  @JoinColumn()
  movie: Movie;

  @Field((type) => [TimeTable])
  @Column({ type: 'json' })
  timeTable: TimeTable[];

  @Field((type) => [Screen], { nullable: true })
  @ManyToMany((type) => Screen, (screen) => screen.releasedMovies, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  screens: Screen[];

  @Field((type) => [Reservation])
  @OneToMany(
    (type) => Reservation,
    (reservation) => reservation.releasedMovie,
    {
      onDelete: 'SET NULL',
      nullable: true,
    },
  )
  reservations: Reservation[];
}
