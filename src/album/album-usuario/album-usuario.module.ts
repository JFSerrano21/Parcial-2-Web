// album-usuario.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumUsuarioService } from './album-usuario.service';
import { Album } from '../album';
import { Usuario } from 'src/usuario/usuario';
import { AlbumModule } from '../album.module';
import { AlbumUsuarioController } from './album-usuario.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album, Usuario]), 
    AlbumModule, 
  ],
  providers: [AlbumUsuarioService],
  exports: [AlbumUsuarioService],
  controllers: [AlbumUsuarioController],
})
export class AlbumUsuarioModule {}
