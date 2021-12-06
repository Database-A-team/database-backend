import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dtos';
import { Reservation } from '../entities/reservations.entity';

@InputType()
export class TakeReservationInput extends PickType(Reservation, ['id']) {}

@ObjectType()
export class TakeReservationOutput extends MutationOutput {}
