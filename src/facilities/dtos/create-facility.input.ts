import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateFacilityInput {
    @Field(() => String)
    name: string;

    @Field(() => String)
    image: string;
}