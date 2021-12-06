import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

@InputType('PaymentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Payment extends CoreEntity {
  @Field((type) => String)
  @Column()
  transactionId: string;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.payments, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  user: User;

  @Field((type) => Movie)
  @ManyToOne((type) => Movie)
  movie: Movie;

  @RelationId((payment: Payment) => payment.user)
  userId: number;

  @Field((type) => Int)
  @RelationId((payment: Payment) => payment.movie)
  movieId: number;
}
