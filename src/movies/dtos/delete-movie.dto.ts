import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dtos';

@InputType()
export class DeleteMovieInput {
  @Field((type) => Number)
  movieId: number;
}

@ObjectType()
export class DeleteMovieOutput extends MutationOutput {}
