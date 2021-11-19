import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateFacilityInput } from "./create-facility.input";

@InputType()
export class UpdateFacilityInput extends PartialType(CreateFacilityInput) {
    @Field(() => Int)
    id: number;
}