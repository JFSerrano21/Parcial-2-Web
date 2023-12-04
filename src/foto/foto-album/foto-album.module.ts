import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoAlbumService } from './foto-album.service';
import { Album } from 'src/album/album';
import { FotoModule } from '../foto.module';
import { FotoAlbumController } from './foto-album.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album]), 
    FotoModule, 
  ],
  providers: [FotoAlbumService],
  exports: [FotoAlbumService],
  controllers: [FotoAlbumController], 
})
export class FotoAlbumModule {}
