import { Test, TestingModule } from '@nestjs/testing';
import { TheatersResolver } from './theaters.resolver';

describe('TheatersResolver', () => {
  let resolver: TheatersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TheatersResolver],
    }).compile();

    resolver = module.get<TheatersResolver>(TheatersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
