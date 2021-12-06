import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  CreateReservationInput,
  CreateReservationOutput,
} from './dtos/create-reservation.dto';
import {
  EditReservationInput,
  EditReservationOutput,
} from './dtos/edit-reservation.dto';
import {
  GetReservationInput,
  GetReservationOutput,
} from './dtos/get-reservation.dto';
import {
  GetReservationsInput,
  GetReservationsOutput,
} from './dtos/get-reservations.dto';
import { Reservation } from './entities/reservations.entity';
import { ReservationService } from './reservations.service';

@Resolver((of) => Reservation)
export class ReservationResolver {
  constructor(private readonly reservationService: ReservationService) {}

  @Mutation((returns) => CreateReservationOutput)
  @Role(['Client'])
  createReservation(
    @AuthUser() customer: User,
    @Args('input') createReservationInput: CreateReservationInput,
  ): Promise<CreateReservationOutput> {
    return this.reservationService.createReservation(
      customer,
      createReservationInput,
    );
  }

  @Query((returns) => GetReservationsOutput)
  @Role(['Any'])
  getReservations(
    @AuthUser() user: User,
    @Args('input') getReservationsInput: GetReservationsInput,
  ): Promise<GetReservationsOutput> {
    return this.reservationService.getReservations(user, getReservationsInput);
  }

  @Query((returns) => GetReservationOutput)
  @Role(['Any'])
  getReservation(
    @AuthUser() user: User,
    @Args('input') getReservationInput: GetReservationInput,
  ): Promise<GetReservationOutput> {
    return this.reservationService.getReservation(user, getReservationInput);
  }

  @Mutation((returns) => EditReservationOutput)
  @Role(['Any'])
  editReservation(
    @AuthUser() user: User,
    @Args('input') editReservationInput: EditReservationInput,
  ): Promise<EditReservationOutput> {
    return this.reservationService.editReservation(user, editReservationInput);
  }
}
