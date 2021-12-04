import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Raw, Repository } from 'typeorm';
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
import { GenreRepository } from './repositories/genre.repository';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movies: Repository<Movie>,
    private readonly genres: GenreRepository,
  ) {}

  async createMovie(
    admin: User,
    createMovieInput: CreateMovieInput,
  ): Promise<CreateMovieOutput> {
    try {
      const newMovie = this.movies.create(createMovieInput);
      newMovie.admin = admin;
      const genre = await this.genres.getOrCreate(createMovieInput.genreName);
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

  async editMovie(
    admin: User,
    editMovieInput: EditMovieInput,
  ): Promise<EditMovieOutput> {
    try {
      const movie = await this.movies.findOneOrFail(editMovieInput.movieId, {
        loadRelationIds: true,
      });
      if (!movie) {
        return {
          ok: false,
          error: 'Movie not found',
        };
      }
      if (admin.id !== movie.adminId) {
        // 지금은 초기에 등록한 어드민이 아니면 수정 불가.
        // 추후 다른 어드민이 수정하면 어드민을 바꿀 것.
        return {
          ok: false,
          error: "You can't edit a Movie",
        };
      }
      let genre: Genre = null;
      if (editMovieInput.genreName) {
        genre = await this.genres.getOrCreate(editMovieInput.genreName);
      }
      await this.movies.save([
        {
          id: editMovieInput.movieId,
          ...editMovieInput,
          ...(genre && { genre }),
        },
      ]);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not edit movie.',
      };
    }
  }

  async deleteMovie(
    admin: User,
    { movieId }: DeleteMovieInput,
  ): Promise<DeleteMovieOutput> {
    try {
      const movie = await this.movies.findOne(movieId);
      if (!movie) {
        return {
          ok: false,
          error: 'Movie not found',
        };
      }
      if (admin.id !== movie.adminId) {
        return {
          ok: false,
          error: "You can't delete a movie.",
        };
      }
      await this.movies.delete(movieId);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not delete Movie',
      };
    }
  }

  async allGenres(): Promise<AllGenresOutput> {
    try {
      const genres = await this.genres.find();
      return {
        ok: true,
        genres,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not load genres',
      };
    }
  }

  countMovies(genre: Genre) {
    return this.movies.count({ genre });
  }

  async findGenreBySlug({ slug, page }: GenreInput): Promise<GenreOutput> {
    try {
      const genre = await this.genres.findOne({ slug });
      if (!genre) {
        return {
          ok: false,
          error: 'Genre not found',
        };
      }
      const genres = await this.movies.find({
        where: {
          genre,
        },
        take: 25,
        skip: (page - 1) * 25,
      });
      genre.movies = genres;
      const totalResults = await this.countMovies(genre);
      return {
        ok: true,
        genre,
        totalPages: Math.ceil(totalResults / 25),
      };
    } catch {
      return {
        ok: false,
        error: 'Could not load genre',
      };
    }
  }

  async allMovies({ page }: MoviesInput): Promise<MoviesOutput> {
    try {
      const [movies, totalResults] = await this.movies.findAndCount({
        skip: (page - 1) * 25,
        take: 25,
      });
      return {
        ok: true,
        movies,
        totalPages: Math.ceil(totalResults / 25),
        totalItems: totalResults,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not load Movies',
      };
    }
  }

  async findMovieById(movieInput: MovieInput): Promise<MovieOutput> {
    try {
      const movie = await this.movies.findOne();
      if (!movie) {
        return {
          ok: false,
          error: 'Movie not Found.',
        };
      }
      return {
        ok: true,
        movie,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not find Movie',
      };
    }
  }

  async searchMovieByName({
    query,
    page,
  }: SearchMovieInput): Promise<SearchMovieOutput> {
    try {
      const [movies, totalResults] = await this.movies.findAndCount({
        where: {
          name: Raw((name) => `${name} ILIKE '%${query}%'`),
        },
      });
      return {
        ok: true,
        movies,
        totalItems: totalResults,
        totalPages: Math.ceil(totalResults / 25),
      };
    } catch {
      return {
        ok: false,
        error: 'Could not search Movie',
      };
    }
  }
}
