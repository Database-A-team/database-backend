import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { Movie } from './entities/movie.entity';
import { MovieResolver } from './movies.resolver';
import { MovieService } from './movies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre])],
  providers: [MovieResolver, MovieService],
})
export class MoviesModule {}
