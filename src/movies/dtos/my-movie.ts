import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dtos';
import { Movie } from '../entities/movie.entity';

@InputType()
export class MyMovieInput extends PickType(Movie, ['id']) {}

@ObjectType()
export class MyMovieOutput extends MutationOutput {
  @Field((type) => Movie, { nullable: true })
  movie?: Movie;
}
