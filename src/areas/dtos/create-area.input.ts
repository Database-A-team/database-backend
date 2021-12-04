import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAreaInput {
  @Field(() => String)
  name: string;
}
