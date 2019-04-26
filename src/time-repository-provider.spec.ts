import { Test, TestingModule } from '@nestjs/testing';
import { TimeRepositoryProvider } from './time-repository-provider';

describe('TimeRepositoryProvider', () => {
  let provider: TimeRepositoryProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeRepositoryProvider],
    }).compile();

    provider = module.get<TimeRepositoryProvider>(TimeRepositoryProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
