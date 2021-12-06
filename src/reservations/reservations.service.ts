import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/movies/entities/movie.entity';
import { ReleasedMovie } from 'src/movies/entities/released-movie.entity';
import { Screen } from 'src/screens/entities/screen.entity';
import { Seat } from 'src/seats/entities/seat.entity';
import { User, UserRole } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
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
import { ReservationItem } from './entities/reservation-item.entity';
import { Reservation, ReservationStatus } from './entities/reservations.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservations: Repository<Reservation>,
    @InjectRepository(ReservationItem)
    private readonly reservationItems: Repository<ReservationItem>,
    @InjectRepository(Screen)
    private readonly screens: Repository<Screen>,
    @InjectRepository(ReleasedMovie)
    private readonly releasedMovies: Repository<ReleasedMovie>,
    @InjectRepository(Seat)
    private readonly seats: Repository<Seat>,
    @InjectRepository(Movie)
    private readonly movies: Repository<Movie>,
  ) {}

  async createReservation(
    customer: User,
    { screenId, item, releasedMovieId }: CreateReservationInput,
  ): Promise<CreateReservationOutput> {
    try {
      const screen = await this.screens.findOne(screenId);
      if (!screen) {
        return {
          ok: false,
          error: 'Screen not found',
        };
      }
      const releasedMovie = await this.releasedMovies.findOne(releasedMovieId);
      if (!releasedMovie) {
        return {
          ok: false,
          error: 'Movie not Found',
        };
      }
      //성인 12000원, 청소년 9000원.
      //특별관이면 추가가격. * 1.2?
      //조조영화 심야영화.
      const ticketPrice = item.viwer.adult * 12000 + item.viwer.youth * 9000;
      const reservatedSeats: Seat[] = [];
      for (const seatId of item.seatIds) {
        const seat = await this.seats.findOne(seatId);
        if (!seat) {
          return {
            ok: false,
            error: 'Seat not Found.',
          };
        }
        reservatedSeats.push(seat);
      }
      const reservationItem = await this.reservationItems.save(
        this.reservationItems.create({
          seats: reservatedSeats,
          timeTable: item.timeTable,
          viewer: item.viwer,
        }),
      );
      const reservation = await this.reservations.save(
        this.reservations.create({
          releasedMovie,
          customer,
          screen,
          item: reservationItem,
          total: ticketPrice,
        }),
      );
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not create Reservation.',
      };
    }
  }

  async getReservations(
    user: User,
    { status }: GetReservationsInput,
  ): Promise<GetReservationsOutput> {
    let reservations: Reservation[] = [];
    try {
      if (user.role === UserRole.Client) {
        reservations = await this.reservations.find({
          where: {
            customer: user,
            ...(status && { status }),
          },
        });
      } else if (user.role === UserRole.Staff) {
        reservations = await this.reservations.find({
          where: {
            customer: user,
            ...(status && { status }),
          },
        });
      } else if (user.role === UserRole.Admin) {
        const releasedMovies = await this.movies.find({
          where: {
            admin: user,
          },
          relations: ['released'],
        });
        for (const reserve of releasedMovies) {
          const reservation = await this.reservations.findOne({
            where: {
              releasedMovie: reserve.released,
            },
          });
          if (!reservation) continue;
          reservations.push(reservation);
        }
        if (status) {
          reservations = reservations.filter(
            (reservation) => reservation.status === status,
          );
        }
      }
      return {
        ok: true,
        reservations,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not get Reservations.',
      };
    }
  }

  async getReservation(
    user: User,
    { id: reservationId }: GetReservationInput,
  ): Promise<GetReservationOutput> {
    try {
      const reservation = await this.reservations.findOne(reservationId, {
        relations: ['releasedMovie'],
      });
      if (!reservation) {
        return {
          ok: false,
          error: 'Reservation not Found.',
        };
      }
      if (!this.canSeeOrder(user, reservation)) {
        return {
          ok: false,
          error: "You Can't do this.",
        };
      }
      return {
        ok: true,
        reservation,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not get Reservation.',
      };
    }
  }

  canSeeOrder(user: User, reservation: Reservation): boolean {
    let canSee = true;
    if (user.role === UserRole.Client && reservation.customerId !== user.id) {
      canSee = false;
    }
    if (user.role === UserRole.Staff && reservation.customerId !== user.id) {
      canSee = false;
    }
    if (
      user.role === UserRole.Admin &&
      reservation.releasedMovie.movie.adminId !== user.id
    ) {
      canSee = false;
    }
    return canSee;
  }

  async editReservation(
    user: User,
    { id: reservationId, status }: EditReservationInput,
  ): Promise<EditReservationOutput> {
    try {
      const reservation = await this.reservations.findOne(reservationId, {
        relations: ['releasedMovie'],
      });
      if (!reservation) {
        return {
          ok: false,
          error: 'Reservation not found.',
        };
      }
      if (!this.canSeeOrder(user, reservation)) {
        return {
          ok: false,
          error: "You Can't edit this.",
        };
      }
      let canEdit = true;
      if (user.role === UserRole.Client) {
        canEdit = false;
      }
      if (user.role === UserRole.Staff) {
        if (status !== ReservationStatus.Reservated) {
          canEdit = false;
        }
      }
      if (!canEdit) {
        return {
          ok: false,
          error: "You can't do that.",
        };
      }
      await this.reservations.save([
        {
          id: reservationId,
          status,
        },
      ]);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not edit Reservation.',
      };
    }
  }
}
