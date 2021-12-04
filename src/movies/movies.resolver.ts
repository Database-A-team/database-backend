import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Int,
  Parent,
} from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { AllGenresOutput } from './dtos/all-genres.dto';
import { CreateMovieInput, CreateMovieOutput } from './dtos/create-movie.dto';
import { DeleteMovieInput, DeleteMovieOutput } from './dtos/delete-movie.dto';
import { EditMovieInput, EditMovieOutput } from './dtos/edit-movie.dto';
import { GenreInput, GenreOutput } from './dtos/genre.dto';
import { MovieInput, MovieOutput } from './dtos/movie.dto';
import { MoviesInput, MoviesOutput } from './dtos/movies.dto';
import { SearchMovieInput, SearchMovieOutput } from './dtos/search-movie.dto';
import { Genre } from './entities/genre.entity';
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

  @Mutation((returns) => EditMovieOutput)
  @Role(['Admin'])
  editMovie(
    @AuthUser() admin: User,
    @Args('input') editMovieInput: EditMovieInput,
  ): Promise<EditMovieOutput> {
    return this.movieService.editMovie(admin, editMovieInput);
  }

  @Mutation((returns) => DeleteMovieOutput)
  @Role(['Admin'])
  deleteMovie(
    @AuthUser() admin: User,
    @Args('input') deleteMovieInput: DeleteMovieInput,
  ): Promise<DeleteMovieOutput> {
    return this.movieService.deleteMovie(admin, deleteMovieInput);
  }

  @Query((returns) => MoviesOutput)
  movies(@Args('input') moviesInput: MoviesInput): Promise<MoviesOutput> {
    return this.movieService.allMovies(moviesInput);
  }

  @Query((returns) => MovieOutput)
  movie(@Args('input') movieInput: MovieInput): Promise<MovieOutput> {
    return this.movieService.findMovieById(movieInput);
  }

  @Query((returns) => SearchMovieOutput)
  searchMovie(
    @Args('input') searchMovieInput: SearchMovieInput,
  ): Promise<SearchMovieOutput> {
    return this.movieService.searchMovieByName(searchMovieInput);
  }
}

@Resolver((of) => Genre)
export class GenreResolver {
  constructor(private readonly movieService: MovieService) {}

  @ResolveField((type) => Int)
  movieCount(@Parent() genre: Genre): Promise<number> {
    return this.movieService.countMovies(genre);
  }

  @Query((type) => AllGenresOutput)
  allGenres(): Promise<AllGenresOutput> {
    return this.movieService.allGenres();
  }

  @Query((type) => GenreOutput)
  genre(@Args('input') genreInput: GenreInput): Promise<GenreOutput> {
    return this.movieService.findGenreBySlug(genreInput);
  }
}
