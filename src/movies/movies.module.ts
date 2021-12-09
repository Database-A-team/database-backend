import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Screen } from 'src/screens/entities/screen.entity';
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
  imports: [
    TypeOrmModule.forFeature([Movie, GenreRepository, ReleasedMovie, Screen]),
  ],
  providers: [
    MovieResolver,
    GenreResolver,
    ReleasedMovieResolver,
    MovieService,
  ],
})
export class MoviesModule {}
