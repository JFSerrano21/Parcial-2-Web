import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FotoModule } from './foto/foto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { RedsocialModule } from './redsocial/redsocial.module';
import { AlbumModule } from './album/album.module';
import { UsuarioEntity } from './usuario/usuarioentity/usuarioentity';
import { Redsocialentity } from './redsocial/redsocialentity/redsocialentity';
import { AlbumEntity } from './album/albumentity/albumentity';
import { FotoEntity } from './foto/fotoentity/fotoentity';
import { FotoserviceService } from './foto/fotoservice/fotoservice.service';
import { RedsocialFotoModule } from './redsocial/redsocial-foto/redsocial-foto.module';
import { RedsocialUsuarioModule } from './redsocial/redsocial-usuario/redsocial-usuario.module';
import { UsuarioFotoModule } from './usuario/usuario-foto/usuario-foto.module';
import { AlbumFotoModule } from './album/album-foto/album-foto.module';
import { UsuarioAlbumModule } from './usuario/usuario-album/usuario-album.module';

@Module({
  imports: [FotoModule   ,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'parcial2',
    entities: [UsuarioEntity,
      Redsocialentity,
      AlbumEntity,
      FotoEntity
    ],
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: true,
  }),
    UsuarioModule,
    RedsocialModule,
    AlbumModule,
    RedsocialFotoModule,
    RedsocialUsuarioModule,
    UsuarioFotoModule,
    AlbumFotoModule,
    UsuarioAlbumModule],
  controllers: [AppController],
  providers: [AppService, FotoserviceService],
  
})
export class AppModule {}
