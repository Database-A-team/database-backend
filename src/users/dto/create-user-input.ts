import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
    @Field(() => String)
    name: string;

    @Field(() => Int)
    age: number;

    @Field(() => String)
    email: string;

    @Field(() => String)
    phone_number: string;
}