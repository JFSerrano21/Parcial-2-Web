import { Module } from '@nestjs/common';
import { UsuarioAlbumService } from './usuario-album.service';

@Module({
  providers: [UsuarioAlbumService]
})
export class UsuarioAlbumModule {}
