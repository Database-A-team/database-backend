import { Field, InputType, Int, PartialType, PickType } from '@nestjs/graphql';
import { SeatRow } from '../entities/seatRow.entity';

@InputType()
export class CreateSeatRowInput extends PickType(
  PartialType(SeatRow),
  ['rowName'],
  InputType,
) {
  @Field(() => [Int], { nullable: true })
  seatIds?: number[];

  @Field(() => Int, { nullable: true })
  screenId: number;

  @Field(() => [Int], { nullable: true})
  updateSeatRowIds: number[];
}
