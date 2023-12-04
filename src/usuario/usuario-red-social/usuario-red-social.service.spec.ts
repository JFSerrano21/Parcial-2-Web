import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioRedSocialService } from './usuario-red-social.service';

describe('UsuarioRedSocialService', () => {
  let service: UsuarioRedSocialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioRedSocialService],
    }).compile();

    service = module.get<UsuarioRedSocialService>(UsuarioRedSocialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
