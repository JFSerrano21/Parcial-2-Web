import { Test, TestingModule } from '@nestjs/testing';
import { FotoAlbumService } from './foto-album.service';

describe('FotoAlbumService', () => {
  let service: FotoAlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FotoAlbumService],
    }).compile();

    service = module.get<FotoAlbumService>(FotoAlbumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
