import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Facility {
    @PrimaryGeneratedColumn('increment')
    @Field(() => Int)
    id: number;

    @Column({unique: true})
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => String)
    image: string;
}