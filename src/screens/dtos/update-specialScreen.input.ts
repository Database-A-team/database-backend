import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateSpecialScreenInput } from './create-specialScreen.input';

@InputType()
export class UpdateSpecialScreenInput extends PartialType(
  CreateSpecialScreenInput,
) {
  @Field(() => Int)
  id: number;
}
