import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dtos';
import { CreateMovieInput } from './create-movie.dto';

@InputType()
export class EditMovieInput extends PartialType(CreateMovieInput) {
  @Field((type) => Number)
  movieId: number;
}

@ObjectType()
export class EditMovieOutput extends MutationOutput {}
