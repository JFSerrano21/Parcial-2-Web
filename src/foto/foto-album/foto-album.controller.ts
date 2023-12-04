import { Controller, Post, Param, ParseIntPipe } from '@nestjs/common';
import { FotoAlbumService } from './foto-album.service';

@Controller('foto-album')
export class FotoAlbumController {
  constructor(private readonly albumService: FotoAlbumService) {}

  @Post(':albumId/fotos/:fotoId')
  addFotoToAlbum(
    @Param('albumId', ParseIntPipe) albumId: number,
    @Param('fotoId', ParseIntPipe) fotoId: number
  ) {
    return this.albumService.addFotoToAlbum(albumId, fotoId);
  }
}
