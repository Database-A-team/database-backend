import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/movies/entities/movie.entity';
import { ReleasedMovie } from 'src/movies/entities/released-movie.entity';
import { Screen } from 'src/screens/entities/screen.entity';
import { Seat } from 'src/seats/entities/seat.entity';
import { ReservationItem } from './entities/reservation-item.entity';
import { Reservation } from './entities/reservations.entity';
import { ReservationResolver } from './reservations.resolver';
import { ReservationService } from './reservations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reservation,
      ReservationItem,
      Screen,
      ReleasedMovie,
      Seat,
      Movie,
    ]),
  ],
  providers: [ReservationService, ReservationResolver],
})
export class ReservationsModule {}
