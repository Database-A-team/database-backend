import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateAreaInput } from './dtos/create-area.input';
import { UpdateAreaInput } from './dtos/update-area.input';
import { Area } from './entities/area.entity';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
  ) {}

  async create(createAreaInput: CreateAreaInput): Promise<Area> {
    let area = new Area();
    area.name = createAreaInput.name;
    area.theaters = [];

    return this.areaRepository.save(area);
  }

  async findAll(): Promise<Array<Area>> {
    return await this.areaRepository.find({ relations: ['theaters'] });
  }

  async findOneById(id: number): Promise<Area> {
    const area = await this.areaRepository.findOne({ id: id });
    if (!area) throw new NotFoundException(`Area id : ${id} is not found`);

    return area;
  }

  async findOneByName(name: string): Promise<Area> {
    const area = await this.areaRepository.findOne({ name: name });
    if (!area) throw new NotFoundException(`Area name : ${name} is not found`);

    return area;
  }

  async searchByName(name: string): Promise<Array<Area>> {
    return await this.areaRepository.find({ name: ILike(`%${name}%`) });
  }

  async update(id: number, updateAreaInput: UpdateAreaInput): Promise<Area> {
    let area = await this.areaRepository.findOne({ id: id });
    if (!area) throw new NotFoundException(`Area id : ${id} is not found`);

    Object.assign(area, updateAreaInput);
    return await this.areaRepository.save(area);
  }

  async delete(id: number): Promise<boolean> {
    const area = await this.areaRepository.findOne({ id: id });
    if (!area) throw new NotFoundException(`Area #${id} is not found`);

    await this.areaRepository.remove(area);
    return true;
  }
}
