import { Field, InputType, Int, PartialType, PickType } from "@nestjs/graphql";
import { SeatType } from "../entities/seatType.entity";

@InputType()
export class CreateSeatTypeInput extends PickType(PartialType(SeatType), [
    "name",
    "image"
], InputType) {
    @Field(() => [Int], {nullable: true})
    seatIds: number[];
}