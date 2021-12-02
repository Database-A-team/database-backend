import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsResolver } from './seats.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { SeatRow } from './entities/seatRow.entity';
import { SeatType } from './entities/seatType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seat, SeatRow, SeatType])],
  providers: [SeatsService, SeatsResolver]
})
export class SeatsModule {}
