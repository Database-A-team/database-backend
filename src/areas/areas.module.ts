import { Module } from '@nestjs/common';
import { AreasService } from './areas.service';
import { AreasResolver } from './areas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './entities/area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Area])],
  providers: [AreasService, AreasResolver]
})
export class AreasModule {}
