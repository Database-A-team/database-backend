import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/movies/entities/movie.entity';
import { User } from 'src/users/entities/user.entity';
import { LessThan, Repository } from 'typeorm';
import {
  CreatePaymentInput,
  CreatePaymentOutput,
} from './dtos/create-payment.dto';
import { GetPaymentsOutput } from './dtos/get-payments.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly payments: Repository<Payment>,
    @InjectRepository(Movie)
    private readonly movies: Repository<Movie>,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async createPayment(
    admin: User,
    { transactionId, movieId }: CreatePaymentInput,
  ): Promise<CreatePaymentOutput> {
    try {
      const movie = await this.movies.findOne(movieId);
      if (!movie) {
        return {
          ok: false,
          error: 'Movie not Found',
        };
      }
      movie.isPromoted = true;
      const date = new Date();
      date.setDate(date.getDate() + 7);
      movie.promotedUntil = date;
      this.movies.save(movie);
      await this.movies.save(
        this.payments.create({
          transactionId,
          movie,
          user: admin,
        }),
      );
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not create Payment',
      };
    }
  }

  async getPayments(admin: User): Promise<GetPaymentsOutput> {
    try {
      const payments = await this.payments.find({ user: admin });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not get Payments',
      };
    }
  }

  @Cron('0 0 * * *')
  async checkkPromotedMovies() {
    const movies = await this.movies.find({
      isPromoted: true,
      promotedUntil: LessThan(new Date()),
    });
    movies.forEach(async (movie) => {
      movie.isPromoted = false;
      movie.promotedUntil = null;
      await this.movies.save(movie);
    });
  }
}
