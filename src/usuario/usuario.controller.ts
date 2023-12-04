
import { Controller, Get, Post,Body, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto/create-usuario.dto';


@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  createUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.createUsuario(createUsuarioDto);
  }

  @Get(':id')
  findUsuarioById(@Param('id') id: number) {
    return this.usuarioService.findUsuarioById(id);
  }

  @Get()
  findAllUsuarios() {
    return this.usuarioService.findAllUsuarios();
  }
}