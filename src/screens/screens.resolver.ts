import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateScreenInput } from './dtos/create-screen.input';
import { CreateSpecialScreenInput } from './dtos/create-specialScreen.input';
import { UpdateScreenInput } from './dtos/update-screen.input';
import { UpdateSpecialScreenInput } from './dtos/update-specialScreen.input';
import { Screen } from './entities/screen.entity';
import { SpecialScreen } from './entities/specialScreen.entity';
import { ScreensService } from './screens.service';

@Resolver()
export class ScreensResolver {
  constructor(private readonly screensService: ScreensService) {}

  @Mutation(() => Screen)
  createScreen(
    @Args('createScreenInput') createScreenInput: CreateScreenInput,
  ) {
    return this.screensService.createScreen(createScreenInput);
  }

  @Mutation(() => SpecialScreen)
  createSpecialScreen(
    @Args('createSpecialScreenInput')
    createSpecialScreenInput: CreateSpecialScreenInput,
  ) {
    return this.screensService.createSpecialScreen(createSpecialScreenInput);
  }

  @Query(() => [Screen])
  findAllScreen() {
    return this.screensService.findAllScreen();
  }

  @Query(() => Screen)
  findOneScreenById(@Args('id') id: number) {
    return this.screensService.findOneScreenById(id);
  }

  @Query(() => [Screen])
  findAllScreenByTheaterId(@Args('id') id: number) {
    return this.screensService.findAllScreenByTheaterId(id);
  }

  @Query(() => [Screen])
  findAllScreenBySpecialScreenId(@Args('id') id: number) {
    return this.screensService.findAllScreenBySpecialScreenId(id);
  }

  @Query(() => [SpecialScreen])
  findAllSpecialScreen() {
    return this.screensService.findAllSpecialScreen();
  }

  @Query(() => SpecialScreen)
  findOneSpecialScreenById(id: number) {
    return this.screensService.findOneSpecialScreenById(id);
  }

  @Mutation(() => Screen)
  updateScreen(
    @Args('updateScreenInput') updateScreenInput: UpdateScreenInput,
  ) {
    return this.screensService.updateScreen(
      updateScreenInput.id,
      updateScreenInput,
    );
  }

  @Mutation(() => SpecialScreen)
  updateSpecialScreen(
    @Args('updateSpecialScreenInput')
    updateSpecialScreenInput: UpdateSpecialScreenInput,
  ) {
    return this.screensService.updateSpecialScreen(
      updateSpecialScreenInput.id,
      updateSpecialScreenInput,
    );
  }

  @Mutation(() => Boolean)
  deleteScreen(@Args('id') id: number) {
    return this.screensService.deleteScreen(id);
  }

  @Mutation(() => Boolean)
  deleteSpecialScreen(@Args('id') id: number) {
    return this.screensService.deleteSpecialScreen(id);
  }
}
