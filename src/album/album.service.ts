import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto/create-album.dto';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(Album)
        private readonly albumRepository: Repository<Album>,
    ) { }

    // Crear un nuevo álbum con validación de título
    async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
        if (!createAlbumDto.titulo) {
            throw new BadRequestException('El título no puede ser vacío');
        }

        const newAlbum = this.albumRepository.create(createAlbumDto);
        return this.albumRepository.save(newAlbum);
    }

    async findAllAlbums(): Promise<Album[]> {
        return this.albumRepository.find();
    }

    async findAlbumById(id: number): Promise<Album> {
        const album = await this.albumRepository.findOne({ where: { id } });
        if (!album) {
            throw new NotFoundException(`Album with ID ${id} not found`);
        }
        return album;
    }

    async updateAlbum(id: number, updateAlbumDto: any): Promise<Album> {
        const album = await this.findAlbumById(id);
        Object.assign(album, updateAlbumDto);
        return this.albumRepository.save(album);
    }

    // Verificacion de que si tiene Fotos no se pueda borrar
    async deleteAlbum(id: number): Promise<void> {
        const album = await this.albumRepository.findOne({ where: { id }, relations: ['fotos'] });
        if (!album) {
            throw new NotFoundException(`Album with ID ${id} not found`);
        }

        if (album.fotos && album.fotos.length > 0) {
            throw new BadRequestException('No se puede eliminar un album porque tiene fotos asignadas');
        }

        await this.albumRepository.delete(id);
    }
}
