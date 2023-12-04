// foto.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Foto } from './foto';
import { Album } from 'src/album/album';
import { Repository } from 'typeorm';
import { CreateFotoDto } from './dto/create-foto.dto/create-foto.dto';
import { UpdateFotoDto } from './dto/update-foto.dto/update-foto.dto';

@Injectable()
export class FotoService {
  constructor(
    @InjectRepository(Foto)
    private readonly fotoRepository: Repository<Foto>,

    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async createFoto(createFotoDto: CreateFotoDto): Promise<Foto> {
    if (!this.validarLimites(createFotoDto)) {
      throw new BadRequestException('Máximo 2 de los valores deben estar por encima del valor medio de sus cotas');
    }

    const newFoto = this.fotoRepository.create(createFotoDto);
    return this.fotoRepository.save(newFoto);
  }

  // Funcion complementaria para create foto
  private validarLimites(dto: CreateFotoDto): boolean {
    let contador = 0;
    if (dto.ISO > 3350) contador++; // Medio de 100 y 6400
    if (dto.velObturacion > 126) contador++; // Medio de 2 y 250
    if (dto.apertura > 16.5) contador++; // Medio de 1 y 32

    return contador <= 2;
  }

  // Obtener todas las fotos
  async findAllFotos(): Promise<Foto[]> {
    return this.fotoRepository.find();
  }

  // Obtener una foto por ID
  async findFotoById(id: number): Promise<Foto> {
    const foto = await this.fotoRepository.findOne({ where: { id } });
    if (!foto) {
      throw new NotFoundException(`Foto with ID ${id} not found`);
    }
    return foto;
  }

  // Actualizar una foto por ID
  async updateFoto(id: number, updateFotoDto: UpdateFotoDto): Promise<Foto> {
    const foto = await this.findFotoById(id);
    Object.assign(foto, updateFotoDto);
    return this.fotoRepository.save(foto);
  }

  // Delete foto con lo de que es la ultima del album entonces borre el album tambien
  async deleteFoto(id: number): Promise<void> {
    const foto = await this.fotoRepository.findOne({ where: { id }, relations: ['album'] });
    if (!foto) {
      throw new NotFoundException(`Foto with ID ${id} not found`);
    }

    if (foto.album) {
      const fotos = await this.fotoRepository.find({ where: { album: foto.album } });
      if (fotos.length === 1) { // La foto es la última en el álbum
        await this.albumRepository.remove(foto.album);
      }
    }

    await this.fotoRepository.remove(foto);
  }
}
