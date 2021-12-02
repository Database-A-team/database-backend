import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Screen } from 'src/screens/entities/screen.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateSeatInput } from './dtos/create-seat.input';
import { CreateSeatRowInput } from './dtos/create-seatRow.input';
import { CreateSeatTypeInput } from './dtos/create-seatType.input';
import { UpdateSeatInput } from './dtos/update-seat.input';
import { UpdateSeatRowInput } from './dtos/update-seatRow.input';
import { UpdateSeatTypeInput } from './dtos/update-seatType.input';
import { Seat } from './entities/seat.entity';
import { SeatRow } from './entities/seatRow.entity';
import { SeatType } from './entities/seatType.entity';

@Injectable()
export class SeatsService {
    constructor(
        @InjectRepository(Seat)
        private readonly seatRepository: Repository<Seat>,
        @InjectRepository(SeatRow)
        private readonly seatRowRepository: Repository<SeatRow>,
        @InjectRepository(SeatType)
        private readonly seatTypeRepository: Repository<SeatType>,
    ) {}

    async createSeatType(createSeatTypeInput: CreateSeatTypeInput): Promise<SeatType> {
        let seatType = new SeatType();
        seatType.name = createSeatTypeInput.name;
        seatType.image = createSeatTypeInput.image;
        
        if(createSeatTypeInput.seatIds) {
            for(const seatId of createSeatTypeInput.seatIds) {
                const seat = await this.seatRepository.findOne({id: seatId});
                if(!seat) throw new NotFoundException(`Seat id ${seatId} is not found`);

                seatType.seats.push(seat);
            }
        }

        return this.seatTypeRepository.save(seatType);
    }

    async createSeat(createSeatInput: CreateSeatInput): Promise<Seat> {
        let seat = new Seat();
        seat.columnNumber = createSeatInput.columnNumber;
        
        if(createSeatInput.seatTypeId) {
            const seatType = await this.seatTypeRepository.findOne({id: createSeatInput.seatTypeId});
            if(!seatType) throw new NotFoundException(`SeatType id ${createSeatInput.seatTypeId} is not found`);

            seat.seatType = seatType;
        }

        return this.seatRepository.save(seat);
    }

    async createSeatRow(createSeatRowInput: CreateSeatRowInput): Promise<SeatRow> {
        let seatRow = new SeatRow();
        seatRow.rowName = createSeatRowInput.rowName;
        seatRow.seats = [];

        if(createSeatRowInput.seatIds) {
            for(const seatId of createSeatRowInput.seatIds) {
                const seat = await this.seatRepository.findOne({id: seatId});
                if(!seat) throw new NotFoundException(`Seat id ${seatId} is not found`);

                seatRow.seats.push(seat);
            }
        }

        if(createSeatRowInput.screenId) {
            const screen = await getRepository(Screen).findOne({id: createSeatRowInput.screenId});
            if(!screen) throw new NotFoundException(`Screen id ${createSeatRowInput.screenId} is not found`);

            seatRow.screen = screen;
        }

        return await this.seatRowRepository.save(seatRow);
    }

    async findAllSeatType(): Promise<Array<SeatType>> {
        return await this.seatTypeRepository.find({relations: ["seats"]});
    }

    async findAllSeat(): Promise<Array<Seat>> {
        return await this.seatRepository.find({relations: ["seatType", "seatRow"]});
    }

    async findAllSeatRow(): Promise<Array<SeatRow>> {
        return await this.seatRowRepository.find({relations: ["screen", "seats"]});
    }

    async findSeatTypeById(id: number): Promise<SeatType> {
        const seatType = await this.seatTypeRepository.findOne({id: id}, {relations: ["seats"]});
        if(!seatType) throw new NotFoundException(`SeatType id : ${id} is not found`);

        return seatType;
    }

    async findSeatById(id: number): Promise<Seat> {
        const seat = await this.seatRepository.findOne({id: id}, {relations: ["seatType", "seatRow"]});
        if(!seat) throw new NotFoundException(`Seat id ${id} is not found`);

        return seat;
    }

    async findSeatRowById(id: number): Promise<SeatRow> {
        const seatRow = await this.seatRowRepository.findOne({id: id}, {relations: ["screen", "seats"]});
        if(!seatRow) throw new NotFoundException(`SeatRow id ${id} is not found`);

        return seatRow;
    }

    async findAllSeatByScreenId(id: number): Promise<Array<SeatRow>> {
        return await this.seatRowRepository.find({
            relations: ["screen", "seats", "seats.seatType"],
            where: {
                screen: {
                    id: id
                }
            }
        });
    }

    async updateSeatType(id: number, updateSeatTypeInput: UpdateSeatTypeInput): Promise<SeatType> {
        let seatType = await this.seatTypeRepository.findOne({id: id});
        if(!seatType) throw new NotFoundException(`SeatType id ${id} is not found`);

        Object.assign(seatType, updateSeatTypeInput);
        seatType.seats = [];
        if(updateSeatTypeInput.seatIds) {
            for(const seatId of updateSeatTypeInput.seatIds) {
                const seat = await this.seatRepository.findOne({id: seatId});
                if(!seat) throw new NotFoundException(`Seat id ${seatId} is not found`);

                seatType.seats.push(seat);
            }
        }

        return await this.seatTypeRepository.save(seatType);
    }

    async updateSeat(id: number, updateSeatInput: UpdateSeatInput): Promise<Seat> {
        let seat = await this.seatRepository.findOne({id: id});
        if(!seat) throw new NotFoundException(`Seat id ${id} is not found`);

        Object.assign(seat, updateSeatInput);
        
        if(updateSeatInput.seatTypeId) {
            let seatType = await this.seatTypeRepository.findOne({id: id});
            if(!seatType) throw new NotFoundException(`SeatType id ${updateSeatInput.seatTypeId} is not found`);

            seat.seatType = seatType;
        }

        return await this.seatRepository.save(seat);
    }

    async updateSeatRow(id: number, updateSeatRowInput: UpdateSeatRowInput) {
        let seatRow = await this.seatRowRepository.findOne({id: id});
        if(!seatRow) throw new NotFoundException(`SeatRow id ${id} is not found`);

        Object.assign(seatRow, updateSeatRowInput);

        if(updateSeatRowInput.screenId) {
            let screen = await getRepository(Screen).findOne({id: updateSeatRowInput.screenId});
            if(!screen) throw new NotFoundException(`Screen id ${updateSeatRowInput.screenId} is not found`);

            seatRow.screen = screen;
        }

        if(updateSeatRowInput.seatIds) {
            for(const seatId of updateSeatRowInput.seatIds) {
                let seat = await this.seatRepository.findOne({id: id});
                if(!seat) throw new NotFoundException(`Seat id ${seatId} is not found`);

                seatRow.seats.push(seat);
            }
        }

        return this.seatRepository.save(seatRow);
    }

    async deleteSeatType(id: number): Promise<boolean> {
        const seatType = await this.seatTypeRepository.findOne({id: id});
        if(!seatType) throw new NotFoundException(`SeatType id ${id} is not found`);

        await this.seatTypeRepository.remove(seatType);
        return true;
    }

    async deleteSeat(id: number): Promise<boolean> {
        const seat = await this.seatRepository.findOne({id: id});
        if(!seat) throw new NotFoundException(`Seat id ${id} is not found`);

        await this.seatRepository.remove(seat);
        return true;
    }

    async deleteSeatRow(id: number): Promise<boolean> {
        const seatRow = await this.seatRowRepository.findOne({id: id});
        if(!seatRow) throw new NotFoundException(`SeatRow id ${id} is not found`);

        await this.seatRowRepository.remove(seatRow);
        return true;
    }
}
