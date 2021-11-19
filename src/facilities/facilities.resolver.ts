import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateFacilityInput } from './dtos/create-facility.input';
import { UpdateFacilityInput } from './dtos/update-facility.input';
import { Facility } from './entities/facility.entity';
import { FacilitiesService } from './facilities.service';

@Resolver(() => Facility)
export class FacilitiesResolver {
    constructor(
        private readonly facilitiesService: FacilitiesService
    ) {}

    @Mutation(() => Facility)
    createFacility(@Args('createFacilityInput') createFacilityInput: CreateFacilityInput) {
        return this.facilitiesService.create(createFacilityInput);
    }

    @Query(() => [Facility])
    findAllFacility() {
        return this.facilitiesService.findAll();
    }

    @Query(() => Facility)
    findFacilityById(@Args('id') id: number) {
        return this.facilitiesService.findOneById(id);
    }

    @Query(() => Facility)
    findFacilityByName(@Args('name') name: string) {
        return this.facilitiesService.findOneByName(name);
    }

    @Query(() => [Facility])
    searchFacilityByName(@Args('name') name: string) {
        return this.facilitiesService.searchByName(name);
    }

    @Query(() => Facility)
    updateFacility(@Args('updateFacilityInput') updateFacilityInput: UpdateFacilityInput) {
        return this.facilitiesService.update(updateFacilityInput.id, updateFacilityInput);
    }

    @Query(() => Boolean)
    deleteFacility(@Args('id') id: number) {
        return this.facilitiesService.delete(id);
    }
}
