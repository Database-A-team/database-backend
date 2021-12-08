import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Screen } from '../entities/screen.entity';

@InputType()
export class SearchScreenInput extends PaginationInput {
  @Field((type) => String)
  query: string;
}

@ObjectType()
export class SearchScreenOutput extends PaginationOutput {
  @Field((type) => [Screen], { nullable: true })
  screens?: Screen[];
}
