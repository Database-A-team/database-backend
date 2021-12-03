import { EntityRepository, Repository } from 'typeorm';
import { Genre } from '../entities/genre.entity';

@EntityRepository(Genre)
export class GenreRepository extends Repository<Genre> {
  async getOrCreate(name: string): Promise<Genre> {
    const genreName = name.trim().toLowerCase();
    const genreSlug = genreName.replace(/ /g, '-');
    let genre = await this.findOne({ slug: genreSlug });
    if (!genre) {
      genre = await this.save(
        this.create({ slug: genreSlug, name: genreName }),
      );
    }
    return genre;
  }
}
