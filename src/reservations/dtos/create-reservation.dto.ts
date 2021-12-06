import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dtos';
import { TimeTable } from 'src/movies/entities/released-movie.entity';
import { Seat } from 'src/seats/entities/seat.entity';
import {
  ReservationTimeTable,
  ReservationViewer,
} from '../entities/reservation-item.entity';
import { Reservation, Viewer } from '../entities/reservations.entity';

@InputType()
class CreateReservationItemInput {
  @Field((type) => ReservationTimeTable)
  timeTable: ReservationTimeTable;

  @Field((type) => [Int])
  seatIds: number[];

  @Field((type) => ReservationViewer)
  viwer: ReservationViewer;
}

@InputType()
export class CreateReservationInput {
  @Field((type) => Int)
  releasedMovieId: number;

  @Field((type) => Int)
  screenId: number;

  @Field((type) => CreateReservationItemInput, { nullable: true })
  item?: CreateReservationItemInput;
}

@ObjectType()
export class CreateReservationOutput extends MutationOutput {}
