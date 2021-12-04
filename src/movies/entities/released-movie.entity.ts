import { InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from '../../common/entities/core.entity';
import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { Movie } from './movie.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class ReleasedMovie extends CoreEntity {
  @OneToOne((type) => Movie, { onDelete: 'CASCADE' })
  @JoinColumn()
  movie: Movie;
}
