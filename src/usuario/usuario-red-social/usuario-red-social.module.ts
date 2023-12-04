// usuario-red-social.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRedSocialService } from './usuario-red-social.service';
import { Usuario } from '../usuario';
import { RedSocial } from 'src/red-social/red-social';
import { UsuarioRedSocialController } from './usuario-red-social.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, RedSocial]), 
  ],
  providers: [UsuarioRedSocialService],
  exports: [UsuarioRedSocialService],
  controllers: [UsuarioRedSocialController], 
})
export class UsuarioRedSocialModule {}
