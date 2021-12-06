import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Theater } from '../../theaters/entities/theater.entity';

@InputType('AreaInputType', { isAbstract: true })
@Entity()
@ObjectType()
export class Area {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column({ unique: true })
  @Field(() => String)
  name: string;

  @OneToMany((type) => Theater, (theater) => theater.area)
  @Field(() => [Theater])
  theaters: Theater[];
}
