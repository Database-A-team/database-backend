import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dtos';
import { Screen } from 'src/screens/entities/screen.entity';
import { ReleasedMovie } from '../entities/released-movie.entity';

@InputType()
export class CreateReleasedMovieInput {
  @Field((type) => Int)
  movieId: number;
  @Field((type) => [Int])
  screenIds: Screen[];
}

@ObjectType()
export class CreateReleasedMovieOutput extends MutationOutput {}
