import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Movie } from '../entities/movie.entity';

@InputType()
export class MoviesInput extends PaginationInput {}

@ObjectType()
export class MoviesOutput extends PaginationOutput {
  @Field((type) => [Movie], { nullable: true })
  movies?: Movie[];
}
