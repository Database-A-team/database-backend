import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dtos';
import { Reservation } from '../entities/reservations.entity';

@InputType()
export class GetReservationInput extends PickType(Reservation, ['id']) {}

@ObjectType()
export class GetReservationOutput extends MutationOutput {
  @Field((type) => Reservation, { nullable: true })
  reservation?: Reservation;
}
