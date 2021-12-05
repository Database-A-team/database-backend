import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
})
export class ReservationsModule {}