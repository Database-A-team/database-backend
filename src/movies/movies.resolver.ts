import { Query } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateMovieInput, CreateMovieOutput } from './dtos/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { MovieService } from './movies.service';

@Resolver((of) => Movie)
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Mutation((returns) => CreateMovieOutput)
  @Role(['Admin'])
  async createMovie(
    @AuthUser() authUser: User,
    @Args('input') createMovieInput: CreateMovieInput,
  ): Promise<CreateMovieOutput> {
    return this.movieService.createMovie(authUser, createMovieInput);
  }
}
