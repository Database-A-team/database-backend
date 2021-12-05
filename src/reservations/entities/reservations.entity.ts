import {
  Field,
  Float,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { ReleasedMovie } from 'src/movies/entities/released-movie.entity';
import { Screen } from 'src/screens/entities/screen.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum ReservationStatus {
  Reservated = 'Reservated',
  Printed = 'Printed',
  Closed = 'Closed',
}

registerEnumType(ReservationStatus, { name: 'ReservationStatus' });

@InputType('ViewerInputType', { isAbstract: true })
@ObjectType()
class Viewer {
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

  @Field((type) => User, { nullable: true })
  @ManyToOne((type) => User, (user) => user.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  staff?: User;

  @Field((type) => Screen)
  @ManyToOne((type) => Screen, (screen) => screen.reservations, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  screen?: Screen;

  @Field((type) => ReleasedMovie)
  @ManyToOne(
    (type) => ReleasedMovie,
    (releasedmovie) => releasedmovie.reservations,
    {
      onDelete: 'SET NULL',
      nullable: true,
    },
  )
  releasedMovie: ReleasedMovie;

  @Field((type) => Float)
  @Column()
  total: number;

  @Field((type) => Viewer)
  @Column({ type: 'json' })
  viewer: Viewer;

  @Column({ type: 'enum', enum: ReservationStatus })
  @Field((type) => ReservationStatus)
  status: ReservationStatus;
}
