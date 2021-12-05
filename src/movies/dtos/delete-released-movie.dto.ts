import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dtos';

@InputType()
export class DeleteReleasedMovieInput {
  @Field((type) => Int)
  releasedMovieId: number;
}

@ObjectType()
export class DeleteReleasedMovieOutput extends MutationOutput {}
