import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateFacilityInput } from './dtos/create-facility.input';
import { UpdateFacilityInput } from './dtos/update-facility.input';
import { Facility } from './entities/facility.entity';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectRepository(Facility)
    private readonly facilityRepository: Repository<Facility>,
  ) {}

  async create(createFacilityInput: CreateFacilityInput): Promise<Facility> {
    let facility = new Facility();
    facility.name = createFacilityInput.name;
    facility.image = createFacilityInput.image;

    return this.facilityRepository.save(facility);
  }

  async findAll(): Promise<Array<Facility>> {
    return await this.facilityRepository.find();
  }

  async findOneById(id: number): Promise<Facility> {
    const facility = await this.facilityRepository.findOne({ id: id });
    if (!facility)
      throw new NotFoundException(`Facility id : ${id} is not found`);

    return facility;
  }

  async findOneByName(name: string): Promise<Facility> {
    const facility = await this.facilityRepository.findOne({ name: name });
    if (!facility)
      throw new NotFoundException(`Facility name : ${name} is not found`);

    return facility;
  }

  async searchByName(name: string): Promise<Array<Facility>> {
    return await this.facilityRepository.find({ name: ILike(`%${name}%`) });
  }

  async update(
    id: number,
    updateFacilityInput: UpdateFacilityInput,
  ): Promise<Facility> {
    let facility = await this.facilityRepository.findOne({ id: id });
    if (!facility)
      throw new NotFoundException(`Facility id : ${id} is not found`);

    Object.assign(facility, updateFacilityInput);
    return await this.facilityRepository.save(facility);
  }

  async delete(id: number): Promise<boolean> {
    const facility = await this.facilityRepository.findOne({ id: id });
    if (!facility)
      throw new NotFoundException(`Facility id : ${id} is not found`);

    await this.facilityRepository.remove(facility);
    return true;
  }
}
