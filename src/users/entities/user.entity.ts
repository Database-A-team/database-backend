import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { Movie } from 'src/movies/entities/movie.entity';
import { Reservation } from 'src/reservations/entities/reservations.entity';

export enum UserRole {
  Client = 'Client',
  Admin = 'Admin',
  Staff = 'Staff',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column({ select: false })
  @Field((type) => String)
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field((type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ default: false })
  @Field((type) => Boolean)
  @IsBoolean()
  verified: boolean;

  @Field((type) => [Movie])
  @ManyToMany((type) => Movie, (movie) => movie.favUser, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  favMovies: Movie[];

  @Field((type) => [Movie])
  @OneToMany((type) => Movie, (movie) => movie.admin)
  enrollMovies: Movie[];

  @Field((type) => [Reservation])
  @OneToMany((type) => Reservation, (reservation) => reservation.customer)
  reservations: Reservation[];

  @Field((type) => [Reservation])
  @OneToMany((type) => Reservation, (reservation) => reservation.staff)
  orders: Reservation[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
