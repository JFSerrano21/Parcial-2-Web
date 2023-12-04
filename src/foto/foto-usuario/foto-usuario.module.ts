import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoUsuarioService } from './foto-usuario.service';
import { Usuario } from 'src/usuario/usuario';
import { FotoModule } from '../foto.module';
import { FotoUsuarioController } from './foto-usuario.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]), // Importa la entidad Usuario si no está en FotoModule
    FotoModule, // Importa FotoModule si provee la entidad Foto y FotoService
  ],
  providers: [FotoUsuarioService],
  exports: [FotoUsuarioService],
  controllers: [FotoUsuarioController], // Exporta el servicio si se va a usar fuera de este módulo
})
export class FotoUsuarioModule {}
