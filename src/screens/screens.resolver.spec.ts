import { Test, TestingModule } from '@nestjs/testing';
import { ScreensResolver } from './screens.resolver';

describe('ScreensResolver', () => {
  let resolver: ScreensResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreensResolver],
    }).compile();

    resolver = module.get<ScreensResolver>(ScreensResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
