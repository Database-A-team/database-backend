import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ReleasedMovie } from 'src/movies/entities/released-movie.entity';
import { Reservation } from 'src/reservations/entities/reservations.entity';
import { SeatRow } from 'src/seats/entities/seatRow.entity';
import { Theater } from 'src/theaters/entities/theater.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SpecialScreen } from './specialScreen.entity';

@InputType('ScreenInputType', { isAbstract: true })
@Entity()
@ObjectType()
export class Screen {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToOne(() => Theater, (theater) => theater.screens)
  @Field(() => Theater, { nullable: true })
  theater: Theater;

  @ManyToOne(() => SpecialScreen, (specialScreen) => specialScreen.screens)
  @Field(() => SpecialScreen, { nullable: true })
  specialScreen: SpecialScreen;

  @OneToMany(() => SeatRow, (seatRows) => seatRows.screen)
  @Field(() => [SeatRow])
  seatRows: SeatRow[];

  @ManyToMany(() => ReleasedMovie, (releasedMovie) => releasedMovie.screens)
  @Field(() => [ReleasedMovie])
  @JoinTable()
  releasedMovies: ReleasedMovie[];

  @Field((type) => [Reservation])
  @OneToMany((type) => Reservation, (reservation) => reservation.screen)
  reservations: Reservation[];
}
