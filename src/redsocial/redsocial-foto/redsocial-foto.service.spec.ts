import { Test, TestingModule } from '@nestjs/testing';
import { RedsocialFotoService } from './redsocial-foto.service';

describe('RedsocialFotoService', () => {
  let service: RedsocialFotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedsocialFotoService],
    }).compile();

    service = module.get<RedsocialFotoService>(RedsocialFotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
