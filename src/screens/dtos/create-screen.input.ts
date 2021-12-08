import { Field, InputType, Int } from '@nestjs/graphql';
import { TimeTable } from '../entities/screen.entity';

@InputType()
export class CreateScreenInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  theaterId: number;

  @Field(() => Int, { nullable: true })
  specialScreenId: number;

  @Field(() => [TimeTable])
  timeTables: TimeTable[];
}
