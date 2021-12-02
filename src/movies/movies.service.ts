import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMovieInput, CreateMovieOutput } from './dtos/create-movie.dto';
import { Genre } from './entities/genre.entity';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movies: Repository<Movie>,
    @InjectRepository(Genre)
    private readonly genres: Repository<Genre>,
  ) {}

  async createMovie(
    admin: User,
    createMovieInput: CreateMovieInput,
  ): Promise<CreateMovieOutput> {
    try {
      const newMovie = this.movies.create(createMovieInput);
      newMovie.admin = admin;
      const genreName = createMovieInput.genreName.trim().toLowerCase();
      const genreSlug = genreName.replace(/ /g, '-');
      let genre = await this.genres.findOne({ slug: genreSlug });
      if (!genre) {
        genre = await this.genres.save(
          this.genres.create({ slug: genreSlug, name: genreName }),
        );
      }
      newMovie.genre = genre;
      await this.movies.save(newMovie);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not create movie',
      };
    }
  }
}
