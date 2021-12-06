import {
  Field,
  Float,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum, IsNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { ReleasedMovie } from 'src/movies/entities/released-movie.entity';
import { Screen } from 'src/screens/entities/screen.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { ReservationItem } from './reservation-item.entity';

export enum ReservationStatus {
  Reservated = 'Reservated',
  Printed = 'Printed',
  Closed = 'Closed',
}

registerEnumType(ReservationStatus, { name: 'ReservationStatus' });

@InputType('ViewerInputType', { isAbstract: true })
@ObjectType()
export class Viewer {
  @Field((type) => Int)
  youth: number;

  @Field((type) => Int)
  adult: number;
}

@InputType('ReservationInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Reservation extends CoreEntity {
  @Field((type) => User, { nullable: true })
  @ManyToOne((type) => User, (user) => user.reservations, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  customer?: User;

  @RelationId((reservation: Reservation) => reservation.customer)
  customerId: number;

  @Field((type) => User, { nullable: true })
  @ManyToOne((type) => User, (user) => user.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  staff?: User;

  @RelationId((reservation: Reservation) => reservation.staff)
  staffId: number;

  @Field((type) => Screen)
  @ManyToOne((type) => Screen, (screen) => screen.reservations, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  screen?: Screen;

  @ManyToOne((type) => ReleasedMovie, { nullable: true, onDelete: 'CASCADE' })
  releasedMovie?: ReleasedMovie;

  @Field((type) => ReservationItem)
  @ManyToOne((type) => ReservationItem, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  item?: ReservationItem;

  @Field((type) => Float, { nullable: true })
  @Column({ nullable: true })
  @IsNumber()
  total?: number;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.Reservated,
  })
  @Field((type) => ReservationStatus)
  @IsEnum(ReservationStatus)
  status: ReservationStatus;
}
