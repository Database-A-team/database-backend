import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dtos';
import { Movie } from '../entities/movie.entity';

@InputType()
export class AllMoviesInput {}

@ObjectType()
export class AllMoviesOutput extends MutationOutput {
  @Field((type) => [Movie], { nullable: true })
  movies?: Movie[];
}
