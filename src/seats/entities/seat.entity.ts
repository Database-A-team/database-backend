import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ReservationItem } from 'src/reservations/entities/reservation-item.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SeatRow } from './seatRow.entity';
import { SeatType } from './seatType.entity';

@InputType('SeatInputType', { isAbstract: true })
@Entity()
@ObjectType()
export class Seat {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  columnNumber: number;

  @ManyToOne(() => SeatType, (seatType) => seatType.seats)
  @Field(() => SeatType)
  seatType: SeatType;

  @ManyToOne(() => SeatRow, (seatRow) => seatRow.seats)
  @Field(() => SeatRow)
  seatRow: SeatRow;

  @ManyToMany(
    () => ReservationItem,
    (reservationItem) => reservationItem.seats,
    { nullable: true, onDelete: 'SET NULL' },
  )
  @Field(() => ReservationItem)
  reservated: ReservationItem;
}
