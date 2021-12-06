import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dtos';
import { Reservation } from '../entities/reservations.entity';

@InputType()
export class EditReservationInput extends PickType(Reservation, [
  'id',
  'status',
]) {}

@ObjectType()
export class EditReservationOutput extends MutationOutput {}
