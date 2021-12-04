import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dtos';
import { Movie } from '../entities/movie.entity';

@InputType()
export class CreateMovieInput extends PickType(Movie, [
  'name',
  'movieImage',
  'director',
  'actor',
  'duration',
  'openDate',
  'info',
]) {
  @Field((type) => String)
  genreName: string;
}

@ObjectType()
export class CreateMovieOutput extends MutationOutput {}
