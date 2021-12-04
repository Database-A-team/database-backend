import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateAreaInput } from './create-area.input';

@InputType()
export class UpdateAreaInput extends PartialType(CreateAreaInput) {
  @Field(() => Int)
  id: number;
}
