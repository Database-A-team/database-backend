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

@InputType('TimeTableInputType', { isAbstract: true })
@ObjectType()
export class TimeTable {
  @Field((type) => Date)
  startTime: Date;

  @Field((type) => Date)
  endTime: Date;
}

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

  @ManyToOne(() => Theater, (theater) => theater.screens, { eager: true })
  @Field(() => Theater, { nullable: true })
  theater: Theater;

  @ManyToOne(() => SpecialScreen, (specialScreen) => specialScreen.screens)
  @Field(() => SpecialScreen, { nullable: true })
  specialScreen: SpecialScreen;

  @OneToMany(() => SeatRow, (seatRows) => seatRows.screen)
  @Field(() => [SeatRow])
  seatRows: SeatRow[];

  @Column("int", {array: true, default: []})
  @Field(() => [Int])
  stairs: number[];

  @ManyToMany(() => ReleasedMovie, (releasedMovie) => releasedMovie.screens, {
    nullable: true,
  })
  @Field(() => [ReleasedMovie], { nullable: true })
  @JoinTable()
  releasedMovies?: ReleasedMovie[];

  @Field((type) => [Reservation], { nullable: true })
  @OneToMany((type) => Reservation, (reservation) => reservation.screen)
  reservations?: Reservation[];

  @Field((type) => [TimeTable], { nullable: true })
  @Column({ type: 'json' })
  timeTables?: TimeTable[];
}
