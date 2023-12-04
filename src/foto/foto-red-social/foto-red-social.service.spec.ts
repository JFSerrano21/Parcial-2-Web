import { Test, TestingModule } from '@nestjs/testing';
import { FotoRedSocialService } from './foto-red-social.service';

describe('FotoRedSocialService', () => {
  let service: FotoRedSocialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FotoRedSocialService],
    }).compile();

    service = module.get<FotoRedSocialService>(FotoRedSocialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
