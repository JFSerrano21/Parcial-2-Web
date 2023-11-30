import { Test, TestingModule } from '@nestjs/testing';
import { FotoserviceService } from './fotoservice.service';

describe('FotoserviceService', () => {
  let service: FotoserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FotoserviceService],
    }).compile();

    service = module.get<FotoserviceService>(FotoserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
