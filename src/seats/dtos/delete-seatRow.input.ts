import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class DeleteSeatRowInput {
  @Field(() => Int)
  id: number;

  @Field(() => [Int], { nullable: true } )
  updateSeatRowIds: number[];
}
