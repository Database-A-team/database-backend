import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSeatInput } from './dtos/create-seat.input';
import { CreateSeatRowInput } from './dtos/create-seatRow.input';
import { CreateSeatTypeInput } from './dtos/create-seatType.input';
import { DeleteSeatRowInput } from './dtos/delete-seatRow.input';
import { UpdateSeatInput } from './dtos/update-seat.input';
import { UpdateSeatRowInput } from './dtos/update-seatRow.input';
import { UpdateSeatTypeInput } from './dtos/update-seatType.input';
import { Seat } from './entities/seat.entity';
import { SeatRow } from './entities/seatRow.entity';
import { SeatType } from './entities/seatType.entity';
import { SeatsService } from './seats.service';

@Resolver()
export class SeatsResolver {
  constructor(private readonly seatsService: SeatsService) {}

  @Mutation(() => SeatType)
  createSeatType(
    @Args('createSeatTypeInput') createSeatTypeInput: CreateSeatTypeInput,
  ) {
    return this.seatsService.createSeatType(createSeatTypeInput);
  }

  @Mutation(() => Seat)
  createSeat(@Args('createSeatInput') createSeatInput: CreateSeatInput) {
    return this.seatsService.createSeat(createSeatInput);
  }

  @Mutation(() => SeatRow)
  createSeatRow(
    @Args('createSeatRowInput') createSeatRowInput: CreateSeatRowInput,
  ) {
    return this.seatsService.createSeatRow(createSeatRowInput);
  }

  @Query(() => [SeatType])
  findAllSeatType() {
    return this.seatsService.findAllSeatType();
  }

  @Query(() => [Seat])
  findAllSeat() {
    return this.seatsService.findAllSeat();
  }

  @Query(() => [SeatRow])
  findAllSeatRow() {
    return this.seatsService.findAllSeatRow();
  }

  @Query(() => [SeatRow])
  findAllSeatByScreenId(@Args('id') id: number) {
    return this.seatsService.findAllSeatByScreenId(id);
  }

  @Mutation(() => SeatType)
  updateSeatType(
    @Args('updateSeatTypeInput') updateSeatTypeInput: UpdateSeatTypeInput,
  ) {
    return this.seatsService.updateSeatType(
      updateSeatTypeInput.id,
      updateSeatTypeInput,
    );
  }

  @Mutation(() => Seat)
  updateSeat(@Args('updateSeatInput') updateSeatInput: UpdateSeatInput) {
    return this.seatsService.updateSeat(updateSeatInput.id, updateSeatInput);
  }

  @Mutation(() => SeatRow)
  updateSeatRow(
    @Args('updateSeatRowInput') updateSeatRowInput: UpdateSeatRowInput,
  ) {
    return this.seatsService.updateSeatRow(
      updateSeatRowInput.id,
      updateSeatRowInput,
    );
  }

  @Mutation(() => Boolean)
  deleteSeatType(@Args('id') id: number) {
    return this.seatsService.deleteSeatType(id);
  }

  @Mutation(() => Boolean)
  deleteSeat(@Args('id') id: number) {
    return this.seatsService.deleteSeat(id);
  }

  @Mutation(() => Boolean)
  deleteSeatRow(@Args('deleteSeatRowInput') deleteSeatRowInput: DeleteSeatRowInput) {
    return this.seatsService.deleteSeatRow(deleteSeatRowInput);
  }
}
