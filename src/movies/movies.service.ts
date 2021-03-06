import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Screen } from 'src/screens/entities/screen.entity';
import { User } from 'src/users/entities/user.entity';
import { Raw, Repository } from 'typeorm';
import { AllGenresOutput } from './dtos/all-genres.dto';
import { AllMoviesOutput } from './dtos/all-movies.dto';
import { CreateMovieInput, CreateMovieOutput } from './dtos/create-movie.dto';
import {
  CreateReleasedMovieInput,
  CreateReleasedMovieOutput,
} from './dtos/create-released-movie.dto';
import { DeleteMovieInput, DeleteMovieOutput } from './dtos/delete-movie.dto';
import {
  DeleteReleasedMovieInput,
  DeleteReleasedMovieOutput,
} from './dtos/delete-released-movie.dto';
import { EditMovieInput, EditMovieOutput } from './dtos/edit-movie.dto';
import {
  EditReleasedMovieInput,
  EditReleasedMovieOutput,
} from './dtos/edit-released-movie.dto';
import { GenreInput, GenreOutput } from './dtos/genre.dto';
import { MovieInput, MovieOutput } from './dtos/movie.dto';
import { MoviesInput, MoviesOutput } from './dtos/movies.dto';
import { MyMovieInput, MyMovieOutput } from './dtos/my-movie';
import { SearchMovieInput, SearchMovieOutput } from './dtos/search-movie.dto';
import { Genre } from './entities/genre.entity';
import { Movie } from './entities/movie.entity';
import { ReleasedMovie } from './entities/released-movie.entity';
import { GenreRepository } from './repositories/genre.repository';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movies: Repository<Movie>,
    private readonly genres: GenreRepository,
    @InjectRepository(ReleasedMovie)
    private readonly releasedmovies: Repository<ReleasedMovie>,
    @InjectRepository(Screen)
    private readonly screens: Repository<Screen>,
  ) {}

  async createMovie(
    admin: User,
    createMovieInput: CreateMovieInput,
  ): Promise<CreateMovieOutput> {
    try {
      const newMovie = this.movies.create(createMovieInput);
      const genre = await this.genres.getOrCreate(createMovieInput.genreName);
      newMovie.genre = genre;
      await this.movies.save(newMovie);
      return {
        ok: true,
        movieId: newMovie.id,
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
        relations: ['genre'],
      });
      if (!movie) {
        return {
          ok: false,
          error: 'Movie not found',
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
    } catch (error) {
      return {
        ok: false,
        error: error,
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
      const movies = await this.movies.find({
        where: {
          genre,
        },
        take: 3,
        skip: (page - 1) * 3,
        order: {
          isPromoted: 'DESC',
        },
      });
      genre.movies = movies;
      const totalResults = await this.countMovies(genre);
      return {
        ok: true,
        genre,
        movies,
        totalPages: Math.ceil(totalResults / 3),
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
        skip: (page - 1) * 3,
        take: 3,
        order: {
          isPromoted: 'DESC',
        },
      });
      return {
        ok: true,
        movies,
        totalPages: Math.ceil(totalResults / 3),
        totalItems: totalResults,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not load Movies',
      };
    }
  }

  async findMovieById({ movieID }: MovieInput): Promise<MovieOutput> {
    try {
      const movie = await this.movies.findOne(movieID, {
        relations: ['released'],
      });
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
        totalPages: Math.ceil(totalResults / 3),
      };
    } catch {
      return {
        ok: false,
        error: 'Could not search Movie',
      };
    }
  }

  async createReleasedMovie(
    createReleasedMovieInput: CreateReleasedMovieInput,
  ): Promise<CreateReleasedMovieOutput> {
    try {
      const movie = await this.movies.findOne(createReleasedMovieInput.movieId);
      if (!movie) {
        return {
          ok: false,
          error: 'Movie Not Found',
        };
      }
      const screens: Screen[] = [];
      for (const screenId of createReleasedMovieInput.screenIds) {
        const screen = await this.screens.findOne(screenId);
        if (!screen) {
          return {
            ok: false,
            error: 'Screen not Found.',
          };
        }
        screens.push(screen);
      }
      const releasedMovie = await this.releasedmovies.save(
        this.releasedmovies.create({
          ...createReleasedMovieInput,
          movie,
          screens,
        }),
      );
      movie.released = releasedMovie;
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not released movie.',
      };
    }
  }

  async editReleasedMovie(
    editReleasedMovieInput: EditReleasedMovieInput,
  ): Promise<EditReleasedMovieOutput> {
    try {
      const releasedMovie = await this.releasedmovies.findOne(
        editReleasedMovieInput.releasedMovieId,
        {
          relations: ['movie'],
        },
      );
      if (!releasedMovie) {
        return {
          ok: false,
          error: 'Movie not Found',
        };
      }
      await this.releasedmovies.save([
        {
          id: editReleasedMovieInput.releasedMovieId,
          ...editReleasedMovieInput,
        },
      ]);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not edit released movie',
      };
    }
  }

  async deleteReleasedMovie({
    releasedMovieId,
  }: DeleteReleasedMovieInput): Promise<DeleteReleasedMovieOutput> {
    try {
      const releasedMovie = await this.releasedmovies.findOne(releasedMovieId, {
        relations: ['movie'],
      });
      if (!releasedMovie) {
        return {
          ok: false,
          error: 'Movie not Found',
        };
      }
      await this.releasedmovies.delete(releasedMovieId);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not delete released movie',
      };
    }
  }

  async myMovie(admin: User, { id }: MyMovieInput): Promise<MyMovieOutput> {
    try {
      const movie = await this.movies.findOne(
        { id },
        { relations: ['released'] },
      );
      return {
        movie,
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not get myMovie',
      };
    }
  }

  async realAllMovies(): Promise<AllMoviesOutput> {
    try {
      const movies = await this.movies.find({
        order: {
          isPromoted: 'DESC',
        },
      });
      if (!movies) {
        return {
          ok: false,
          error: 'There is no movie',
        };
      }
      return {
        ok: true,
        movies,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not get all movies',
      };
    }
  }
}
