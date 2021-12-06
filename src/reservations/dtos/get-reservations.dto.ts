import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dtos';
import {
  Reservation,
  ReservationStatus,
} from '../entities/reservations.entity';

@InputType()
export class GetReservationsInput {
  @Field((type) => ReservationStatus, { nullable: true })
  status: ReservationStatus;
}

@ObjectType()
export class GetReservationsOutput extends MutationOutput {
  @Field((type) => [Reservation], { nullable: true })
  reservations?: Reservation[];
}
