import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Seat } from 'src/seats/entities/seat.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@InputType('ReservationTimeTableInputType', { isAbstract: true })
@ObjectType()
export class ReservationTimeTable {
  @Field((type) => Date)
  startTime: Date;

  @Field((type) => Date)
  endTime: Date;
}

@InputType('ReservationViewerInputType', { isAbstract: true })
@ObjectType()
export class ReservationViewer {
  @Field((type) => Int)
  youth: number;

  @Field((type) => Int)
  adult: number;
}

@InputType('ReservationItemInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class ReservationItem extends CoreEntity {
  @Field((type) => [Seat])
  @ManyToMany((type) => Seat, (seats) => seats.reservated, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinTable()
  seats?: Seat[];

  @Field((type) => ReservationTimeTable, { nullable: true })
  @Column({ type: 'json', nullable: true })
  timeTable?: ReservationTimeTable;

  @Field((type) => ReservationViewer, { nullable: true })
  @Column({ type: 'json', nullable: true })
  viewer?: ReservationViewer;
}
