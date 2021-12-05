import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { ReleasedMovie } from './entities/released-movie.entity';
import {
  GenreResolver,
  MovieResolver,
  ReleasedMovieResolver,
} from './movies.resolver';
import { MovieService } from './movies.service';
import { GenreRepository } from './repositories/genre.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, GenreRepository, ReleasedMovie])],
  providers: [
    MovieResolver,
    GenreResolver,
    ReleasedMovieResolver,
    MovieService,
  ],
})
export class MoviesModule {}
