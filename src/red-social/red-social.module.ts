import { Module } from '@nestjs/common';
import { RedSocialService } from './red-social.service';
import { RedSocialController } from './red-social.controller';

@Module({
  providers: [RedSocialService],
  controllers: [RedSocialController]
})
export class RedSocialModule {}
