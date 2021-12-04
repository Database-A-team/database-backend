import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dtos';
import { ReleasedMovie } from '../entities/released-movie.entity';

@InputType()
export class CreateReleasedMovieInput extends PickType(ReleasedMovie, [
  'timeTable',
]) {
  @Field((type) => Int)
  movieId: number;
}

@ObjectType()
export class CreateReleasedMovieOutput extends MutationOutput {}
