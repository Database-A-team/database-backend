import { Module } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { FacilitiesResolver } from './facilities.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facility } from './entities/facility.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Facility])],
  providers: [FacilitiesService, FacilitiesResolver]
})
export class FacilitiesModule {}
