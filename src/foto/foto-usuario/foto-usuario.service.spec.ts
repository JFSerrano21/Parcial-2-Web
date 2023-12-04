import { Test, TestingModule } from '@nestjs/testing';
import { FotoUsuarioService } from './foto-usuario.service';

describe('FotoUsuarioService', () => {
  let service: FotoUsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FotoUsuarioService],
    }).compile();

    service = module.get<FotoUsuarioService>(FotoUsuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
