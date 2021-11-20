import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateScreenInput } from "./create-screen.input";

@InputType()
export class UpdateScreenInput extends PartialType(CreateScreenInput) {
    @Field(() => Int)
    id: number;
}