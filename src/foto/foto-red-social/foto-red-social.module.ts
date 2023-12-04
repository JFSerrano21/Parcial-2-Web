import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoRedSocialService } from './foto-red-social.service';
import { FotoModule } from '../foto.module';
import { RedSocial } from 'src/red-social/red-social';
import { FotoRedSocialController } from './foto-red-social.controller';

@Module({
  imports: [FotoModule, TypeOrmModule.forFeature([RedSocial])],
  providers: [FotoRedSocialService],
  controllers: [FotoRedSocialController],
})
export class FotoRedSocialModule {}
