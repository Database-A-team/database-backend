import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SeatRow } from "./seatRow.entity";
import { SeatType } from "./seatType.entity";

@Entity()
@ObjectType()
export class Seat {
    @PrimaryGeneratedColumn('increment')
    @Field(() => Int)
    id: number;

    @Column()
    @Field(() => Int)
    columnNumber: number;

    @ManyToOne(() => SeatType, seatType => seatType.seats)
    @Field(() => SeatType)
    seatType: SeatType;

    @ManyToOne(() => SeatRow, seatRow => seatRow.seats)
    @Field(() => SeatRow)
    seatRow: SeatRow;
}