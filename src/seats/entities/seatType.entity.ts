import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Seat } from './seat.entity';

@InputType('SeatKindInputType', { isAbstract: true })
@Entity()
@ObjectType()
export class SeatType {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  image: string;

  @OneToMany(() => Seat, (seats) => seats.seatType, { nullable: true })
  @Field(() => [Seat])
  seats?: Seat[];
}
