import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from 'src/areas/entities/area.entity';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Screen } from 'src/screens/entities/screen.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateTheaterInput } from './dtos/create-theater.input';
import { UpdateTheaterInput } from './dtos/update-theater.input';
import { Theater } from './entities/theater.entity';

@Injectable()
export class TheatersService {
  constructor(
    @InjectRepository(Theater)
    private readonly theaterRepository: Repository<Theater>,
  ) {}

  async create(createTheaterInput: CreateTheaterInput): Promise<Theater> {
    let theater = new Theater();
    theater.name = createTheaterInput.name;
    theater.address = createTheaterInput.address;
    theater.facilities = [];
    theater.screens = [];

    if (createTheaterInput.areaId) {
      const area = await getRepository(Area).findOne({
        id: createTheaterInput.areaId,
      });
      if (!area)
        throw new NotFoundException(
          `Area id : ${createTheaterInput.areaId} is not found`,
        );

      theater.area = area;
    }

    if (createTheaterInput.facilityIds) {
      for (const facilityId of createTheaterInput.facilityIds) {
        const facility = await getRepository(Facility).findOne({
          id: facilityId,
        });
        if (!facility)
          throw new NotFoundException(
            `Facility id : ${facilityId} is not found`,
          );

        theater.facilities.push(facility);
      }
    }

    if (createTheaterInput.screenIds) {
      for (const screenId of createTheaterInput.screenIds) {
        const screen = await getRepository(Screen).findOne({ id: screenId });
        if (!screen)
          throw new NotFoundException(`Screen id : ${screenId} is not found`);

        theater.screens.push(screen);
      }
    }

    return await this.theaterRepository.save(theater);
  }

  async findAll(): Promise<Array<Theater>> {
    return await this.theaterRepository.find({
      relations: ['area', 'facilities'],
    });
  }

  async updateTheater(
    id: number,
    updateTheaterInput: UpdateTheaterInput,
  ): Promise<Theater> {
    let theater = await this.theaterRepository.findOne({ id: id });
    if (!theater)
      throw new NotFoundException(`SpecialScreen id : ${id} is not found`);

    Object.assign(theater, updateTheaterInput);

    if (updateTheaterInput.areaId) {
      const area = await getRepository(Area).findOne({
        id: updateTheaterInput.areaId,
      });
      if (!area)
        throw new NotFoundException(
          `Area ${updateTheaterInput.areaId} is not found`,
        );

      theater.area = area;
    }

    theater.facilities = [];
    if (theater.facilities) {
      for (const facilityId of updateTheaterInput.facilityIds) {
        const facility = await getRepository(Facility).findOne({
          id: facilityId,
        });
        if (!facility)
          throw new NotFoundException(`Facility ${facilityId} is not found`);

        theater.facilities.push(facility);
      }
    }

    theater.screens = [];
    if (updateTheaterInput.screenIds) {
      for (const screenId of updateTheaterInput.screenIds) {
        const screen = await getRepository(Screen).findOne({ id: screenId });
        if (!screen)
          throw new NotFoundException(`Screen ${screenId} is not found`);

        theater.screens.push(screen);
      }
    }

    return await this.theaterRepository.save(theater);
  }

  async deleteTheater(id: number): Promise<boolean> {
    const theater = await this.theaterRepository.findOne({ id: id });
    if (!theater)
      throw new NotFoundException(`Theater id : ${id} is not found`);

    await this.theaterRepository.remove(theater);
    return true;
  }
}
