import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioserviceService } from './usuarioservice.service';

describe('UsuarioserviceService', () => {
  let service: UsuarioserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioserviceService],
    }).compile();

    service = module.get<UsuarioserviceService>(UsuarioserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
