import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dtos';
import { Movie } from '../entities/movie.entity';

@InputType()
export class MovieInput {
  @Field((type) => Int)
  movieID: number;
}

@ObjectType()
export class MovieOutput extends MutationOutput {
  @Field((type) => Movie, { nullable: true })
  movie?: Movie;
}
