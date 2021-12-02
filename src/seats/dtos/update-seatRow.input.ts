import { Field, InputType, Int, PartialType, PickType } from "@nestjs/graphql";
import { CreateSeatRowInput } from "./create-seatRow.input";

@InputType()
export class UpdateSeatRowInput extends PartialType(CreateSeatRowInput) {
    @Field(() => Int)
    id: number;
}