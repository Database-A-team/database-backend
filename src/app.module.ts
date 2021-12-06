import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SeatsModule } from './seats/seats.module';
import { ScreensModule } from './screens/screens.module';
import { TheatersModule } from './theaters/theaters.module';
import { AreasModule } from './areas/areas.module';
import { FacilitiesModule } from './facilities/facilities.module';
import { JwtModule } from './jwt/jwt.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { ReservationsModule } from './reservations/reservations.module';
import { CommonModule } from './common/common.module';
import { PaymentsModule } from './payments/payments.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
        MAILGUN_API_KEY: Joi.string().required(),
        MAILGUN_DOMAIN_NAME: Joi.string().required(),
        MAILGUN_FROM_EMAIL: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (connectionParams) => {
            const TOKEN_KEY = 'x-jwt';
            const token = connectionParams[TOKEN_KEY];
            return { token };
          },
        },
      },
      context: ({ req }) => {
        const TOKEN_KEY = 'x-jwt';
        return {
          token: req.headers[TOKEN_KEY],
        };
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: process.env.NODE_ENV !== 'prod',
      autoLoadEntities: true,
    }),
    UsersModule,
    ScheduleModule.forRoot(),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    MailModule.forRoot({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN_NAME,
      fromEmail: process.env.MAILGUN_FROM_EMAIL,
    }),
    AuthModule,
    MoviesModule,
    AreasModule,
    FacilitiesModule,
    ScreensModule,
    SeatsModule,
    TheatersModule,
    ReservationsModule,
    CommonModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
