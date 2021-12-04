import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SeatRow } from 'src/seats/entities/seatRow.entity';
import { Theater } from 'src/theaters/entities/theater.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SpecialScreen } from './specialScreen.entity';

@Entity()
@ObjectType()
export class Screen {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToOne(() => Theater, (theater) => theater.screens)
  @Field(() => Theater, { nullable: true })
  theater: Theater;

  @ManyToOne(() => SpecialScreen, (specialScreen) => specialScreen.screens)
  @Field(() => SpecialScreen, { nullable: true })
  specialScreen: SpecialScreen;

  @OneToMany(() => SeatRow, (seatRows) => seatRows.screen)
  @Field(() => [SeatRow])
  seatRows: SeatRow[];
}
