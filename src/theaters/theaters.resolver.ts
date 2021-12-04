import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTheaterInput } from './dtos/create-theater.input';
import { UpdateTheaterInput } from './dtos/update-theater.input';
import { Theater } from './entities/theater.entity';
import { TheatersService } from './theaters.service';

@Resolver()
export class TheatersResolver {
  constructor(private readonly theatersService: TheatersService) {}

  @Mutation(() => Theater)
  createTheater(
    @Args('createTheaterInput') createTheaterInput: CreateTheaterInput,
  ) {
    return this.theatersService.create(createTheaterInput);
  }

  @Query(() => [Theater])
  findAllTheater() {
    return this.theatersService.findAll();
  }

  @Mutation(() => Theater)
  updateTheater(
    @Args('updateTheaterInput') updateTheaterInput: UpdateTheaterInput,
  ) {
    return this.theatersService.updateTheater(
      updateTheaterInput.id,
      updateTheaterInput,
    );
  }

  @Mutation(() => Boolean)
  deleteTheater(
    @Args('id') id: number,
  ) {
    return this.theatersService.deleteTheater(id);
  }
}
