import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Foto } from './foto';
import { FotoService } from './foto.service';
import { FotoController } from './foto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Foto])],
  providers: [FotoService],
  exports: [FotoService, TypeOrmModule.forFeature([Foto])],
  controllers: [FotoController]
})
export class FotoModule {}
