import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateSeatInput } from "./create-seat.input";

@InputType()
export class UpdateSeatInput extends PartialType(CreateSeatInput) {
    @Field(() => Int)
    id: number;
}