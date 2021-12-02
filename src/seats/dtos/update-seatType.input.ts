import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateSeatTypeInput } from "./create-seatType.input";

@InputType()
export class UpdateSeatTypeInput extends PartialType(CreateSeatTypeInput) {
    @Field(() => Int)
    id: number;
}