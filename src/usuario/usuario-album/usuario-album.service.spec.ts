import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioAlbumService } from './usuario-album.service';

describe('UsuarioAlbumService', () => {
  let service: UsuarioAlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioAlbumService],
    }).compile();

    service = module.get<UsuarioAlbumService>(UsuarioAlbumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
