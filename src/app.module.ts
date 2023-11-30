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
    AlbumModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
