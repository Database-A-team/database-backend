import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { GenreResolver, MovieResolver } from './movies.resolver';
import { MovieService } from './movies.service';
import { GenreRepository } from './repositories/genre.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, GenreRepository])],
  providers: [MovieResolver, GenreResolver, MovieService],
})
export class MoviesModule {}
