import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Screen } from "./screen.entity";

@Entity()
@ObjectType()
export class SpecialScreen {
    @PrimaryGeneratedColumn('increment')
    @Field(() => Int)
    id: number;

    @Column({unique: true})
    @Field(() => String)
    name: string;

    @OneToMany(() => Screen, screen => screen.specialScreen)
    @Field(() => [Screen])
    screens: Screen[];
}