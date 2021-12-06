import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import {
  NEW_PENDING_RESERVATION,
  NEW_RESERVATION_UPDATE,
  PUB_SUB,
} from 'src/common/common.constants';
import { User, UserRole } from 'src/users/entities/user.entity';
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
import { ReservationUpdatesInput } from './dtos/reservation-updates.dto';
import {
  TakeReservationInput,
  TakeReservationOutput,
} from './dtos/take-reservation.dto';
import { Reservation } from './entities/reservations.entity';
import { ReservationService } from './reservations.service';

@Resolver((of) => Reservation)
export class ReservationResolver {
  constructor(
    private readonly reservationService: ReservationService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

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

  @Subscription((returns) => Reservation, {
    filter: (payload, _, context) => {
      return true;
    },
    resolve: (payload) => payload,
  })
  @Role(['Admin', 'Staff'])
  pendingReservations() {
    return this.pubSub.asyncIterator(NEW_PENDING_RESERVATION);
  }

  @Subscription((returns) => Reservation, {
    filter: (
      { reservationUpdates: reservation }: { reservationUpdates: Reservation },
      { input }: { input: ReservationUpdatesInput },
      { user }: { user: User },
    ) => {
      if (reservation.customerId !== user.id && reservation.staffId !== user.id)
        return false;
      return true;
    },
  })
  @Role(['Any'])
  reservationUpdates(
    @Args('input') reservationUpdatesInput: ReservationUpdatesInput,
  ) {
    return this.pubSub.asyncIterator(NEW_RESERVATION_UPDATE);
  }

  @Mutation((returns) => TakeReservationOutput)
  @Role(['Staff'])
  takeReservation(
    @AuthUser() staff: User,
    @Args('input') takeReservationInput: TakeReservationInput,
  ): Promise<TakeReservationOutput> {
    return this.reservationService.takeReservation(staff, takeReservationInput);
  }
}
