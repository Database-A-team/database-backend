import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dtos';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Genre } from '../entities/genre.entity';

@InputType()
export class GenreInput extends PaginationInput {
  @Field((type) => String)
  slug: string;
}

@ObjectType()
export class GenreOutput extends PaginationOutput {
  @Field((type) => Genre, { nullable: true })
  genre?: Genre;
}
