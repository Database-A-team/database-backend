import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateTheaterInput } from './create-theater.input';

@InputType()
export class UpdateTheaterInput extends PartialType(CreateTheaterInput) {
  @Field(() => Int)
  id: number;
}
