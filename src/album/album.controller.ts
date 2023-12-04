import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto/create-album.dto';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Get(':id')
  findAlbumById(@Param('id') id: number) {
    return this.albumService.findAlbumById(id);
  }

  @Delete(':id')
  deleteAlbum(@Param('id') id: number) {
    return this.albumService.deleteAlbum(id);
  }
}