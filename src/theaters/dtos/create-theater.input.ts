import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTheaterInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  address: string;

  @Field(() => Int, { nullable: true })
  areaId: number;

  @Field(() => [Int], { nullable: true })
  facilityIds: number[];

  @Field(() => [Int], { nullable: true })
  screenIds: number[];
}
