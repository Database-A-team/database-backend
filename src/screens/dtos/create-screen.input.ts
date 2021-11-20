import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateScreenInput {
    @Field(() => String)
    name: string;

    @Field(() => Int)
    theaterId: number;

    @Field(() => Int, {nullable: true})
    specialScreenId: number;
}