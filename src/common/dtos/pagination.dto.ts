import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { MutationOutput } from './output.dtos';

@InputType()
export class PaginationInput {
  @Field((type) => Int, { defaultValue: 1 })
  page: number;
}

@ObjectType()
export class PaginationOutput extends MutationOutput {
  @Field((type) => Int, { nullable: true })
  totalPages?: number;

  @Field((type) => Int, { nullable: true })
  totalItems?: number;
}
