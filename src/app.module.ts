import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album/album';
import { Foto } from './foto/foto';
import { RedSocial } from './red-social/red-social';
import { Usuario } from './usuario/usuario';

import { AlbumModule } from './album/album.module';
import { FotoModule } from './foto/foto.module';
import { RedSocialModule } from './red-social/red-social.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { FotoRedSocialModule } from './foto/foto-red-social/foto-red-social.module';
import { UsuarioRedSocialModule } from './usuario/usuario-red-social/usuario-red-social.module';
import { FotoUsuarioModule } from './foto/foto-usuario/foto-usuario.module';
import { FotoAlbumModule } from './foto/foto-album/foto-album.module';
import { AlbumUsuarioModule } from './album/album-usuario/album-usuario.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost', 
      port: 5432, 
      username: 'postgres', 
      password: 'postgres', 
      database: 'parcial-2',
      entities: [Album, Foto, RedSocial, Usuario],
      synchronize: true, 
    }),
    AlbumModule,
    FotoModule,
    RedSocialModule,
    UsuarioModule,
    FotoRedSocialModule,
    UsuarioRedSocialModule,
    FotoUsuarioModule,
    FotoAlbumModule,
    AlbumUsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
