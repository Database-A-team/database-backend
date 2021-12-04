import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSpecialScreenInput {
  @Field(() => String)
  name: string;

  @Field(() => [Int], { nullable: true })
  screenIds: number[];
}
