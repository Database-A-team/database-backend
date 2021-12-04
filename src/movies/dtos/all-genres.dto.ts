import { Field, ObjectType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dtos';
import { Genre } from '../entities/genre.entity';

@ObjectType()
export class AllGenresOutput extends MutationOutput {
  @Field((type) => [Genre], { nullable: true })
  genres?: Genre[];
}
