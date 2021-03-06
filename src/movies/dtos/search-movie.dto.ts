import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Movie } from '../entities/movie.entity';

@InputType()
export class SearchMovieInput extends PaginationInput {
  @Field((type) => String)
  query: string;
}

@ObjectType()
export class SearchMovieOutput extends PaginationOutput {
  @Field((type) => [Movie], { nullable: true })
  movies?: Movie[];
}
