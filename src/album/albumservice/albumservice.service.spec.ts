import { Test, TestingModule } from '@nestjs/testing';
import { AlbumserviceService } from './albumservice.service';

describe('AlbumserviceService', () => {
  let service: AlbumserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbumserviceService],
    }).compile();

    service = module.get<AlbumserviceService>(AlbumserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
