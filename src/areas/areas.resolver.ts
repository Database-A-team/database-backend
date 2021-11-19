import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AreasService } from './areas.service';
import { CreateAreaInput } from './dtos/create-area.input';
import { UpdateAreaInput } from './dtos/update-area.input';
import { Area } from './entities/area.entity';

@Resolver(() => Area)
export class AreasResolver {
    constructor(
        private readonly areasService: AreasService
    ) {}

    @Mutation(() => Area)
    createArea(@Args('createAreaInput') createAreaInput: CreateAreaInput) {
        return this.areasService.create(createAreaInput);
    }

    @Query(() => [Area])
    findAllAreas() {
        return this.areasService.findAll();
    }

    @Query(() => Area)
    findAreaById(@Args('id') id: number) {
        return this.areasService.findOneById(id);
    }

    @Query(() => Area)
    findAreaByName(@Args('name') name: string) {
        return this.areasService.findOneByName(name);
    }

    @Query(() => [Area])
    searchAreaByName(@Args('name') name: string) {
        return this.areasService.searchByName(name);
    }

    @Mutation(() => Area)
    updateArea(@Args('updateAreaInput') updateAreaInput: UpdateAreaInput) {
        return this.areasService.update(updateAreaInput.id, updateAreaInput);
    }

    @Mutation(() => Boolean)
    deleteArea(@Args('id') id: number) {
        return this.areasService.delete(id);
    }
}
