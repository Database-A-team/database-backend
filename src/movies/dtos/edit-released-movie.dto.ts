import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dtos';
import { ReleasedMovie } from '../entities/released-movie.entity';

@InputType()
export class EditReleasedMovieInput extends PickType(
  PartialType(ReleasedMovie),
  ['screens'],
) {
  @Field((type) => Int)
  releasedMovieId: number;
}

@ObjectType()
export class EditReleasedMovieOutput extends MutationOutput {}
