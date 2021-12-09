import { Field, InputType, Int, PartialType, PickType } from '@nestjs/graphql';
import { Seat } from '../entities/seat.entity';

@InputType()
export class CreateSeatInput extends PickType(
  PartialType(Seat),
  ['columnNumber'],
  InputType,
) {
  @Field(() => Int, { nullable: true })
  seatTypeId: number;

  @Field(() => Int, { nullable: true })
  seatRowId: number;
}
