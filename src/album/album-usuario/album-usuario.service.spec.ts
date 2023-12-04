import { Test, TestingModule } from '@nestjs/testing';
import { AlbumUsuarioService } from './album-usuario.service';

describe('AlbumUsuarioService', () => {
  let service: AlbumUsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbumUsuarioService],
    }).compile();

    service = module.get<AlbumUsuarioService>(AlbumUsuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
