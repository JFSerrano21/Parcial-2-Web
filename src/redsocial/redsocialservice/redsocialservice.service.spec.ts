import { Test, TestingModule } from '@nestjs/testing';
import { RedsocialserviceService } from './redsocialservice.service';

describe('RedsocialserviceService', () => {
  let service: RedsocialserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedsocialserviceService],
    }).compile();

    service = module.get<RedsocialserviceService>(RedsocialserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
