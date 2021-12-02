import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Screen } from "src/screens/entities/screen.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Seat } from "./seat.entity";

@Entity()
@ObjectType()
@InputType({isAbstract: true})
export class SeatRow {
    @PrimaryGeneratedColumn('increment')
    @Field(() => Int)
    id: number;

    @Column()
    @Field(() => String)
    rowName: string;

    @OneToMany(() => Seat, seats => seats.seatRow)
    @Field(() => [Seat])
    seats: Seat[];

    @ManyToOne(() => Screen, screen => screen.seatRows)
    @Field(() => Screen)
    screen: Screen;
}