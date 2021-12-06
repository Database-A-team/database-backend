import { InputType, PickType } from '@nestjs/graphql';
import { Reservation } from '../entities/reservations.entity';

@InputType()
export class ReservationUpdatesInput extends PickType(Reservation, ['id']) {}
