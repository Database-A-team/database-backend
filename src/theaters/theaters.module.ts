import { Module } from '@nestjs/common';
import { TheatersService } from './theaters.service';
import { TheatersResolver } from './theaters.resolver';
import { Theater } from './entities/theater.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Theater])],
  providers: [TheatersService, TheatersResolver],
})
export class TheatersModule {}
