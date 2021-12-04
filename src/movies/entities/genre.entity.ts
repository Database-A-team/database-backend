import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Movie } from './movie.entity';

@InputType('GenreInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Genre extends CoreEntity {
  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  name: string;

  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  slug: string;

  @Field((type) => [Movie])
  @OneToMany((type) => Movie, (movie) => movie.genre)
  movies: Movie[];
}
