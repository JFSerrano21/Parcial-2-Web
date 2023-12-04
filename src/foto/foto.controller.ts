import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { FotoService } from './foto.service';
import { CreateFotoDto } from './dto/create-foto.dto/create-foto.dto';

@Controller('fotos')
export class FotoController {
  constructor(private readonly fotoService: FotoService) {}

  @Post()
  createFoto(@Body() createFotoDto: CreateFotoDto) {
    return this.fotoService.createFoto(createFotoDto);
  }

  @Get(':id')
  findFotoByID(@Param('id') id: number) {
    return this.fotoService.findFotoById(id);
  }

  @Get()
  findAllFotos() {
    return this.fotoService.findAllFotos();
  }

  @Delete(':id')
  deleteFoto(@Param('id') id: number) {
    return this.fotoService.deleteFoto(id);
  }
}