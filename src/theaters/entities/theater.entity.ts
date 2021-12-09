import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Screen } from 'src/screens/entities/screen.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Area } from '../../areas/entities/area.entity';
import { Facility } from '../../facilities/entities/facility.entity';

@InputType('TheaterInputType', { isAbstract: true })
@Entity()
@ObjectType()
export class Theater {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  address: string;

  @ManyToOne(() => Area, (area) => area.theaters)
  @Field(() => Area)
  area: Area;

  @ManyToMany(() => Facility)
  @JoinTable()
  @Field(() => [Facility], {nullable: true})
  facilities: Facility[];

  @OneToMany(() => Screen, (screen) => screen.theater)
  @Field(() => [Screen], {nullable: true})
  screens: Screen[];
}
