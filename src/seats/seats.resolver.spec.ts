import { Test, TestingModule } from '@nestjs/testing';
import { SeatsResolver } from './seats.resolver';

describe('SeatsResolver', () => {
  let resolver: SeatsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeatsResolver],
    }).compile();

    resolver = module.get<SeatsResolver>(SeatsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
