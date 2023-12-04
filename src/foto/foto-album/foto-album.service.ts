import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Foto } from 'src/foto/foto';
import { Album } from 'src/album/album';
import { Repository } from 'typeorm';

@Injectable()
export class FotoAlbumService {
    constructor(
        @InjectRepository(Foto)
        private readonly fotoRepository: Repository<Foto>,

        @InjectRepository(Album)
        private readonly albumRepository: Repository<Album>
    ) {}

    async addFotoToAlbum(fotoId: number, albumId: number): Promise<Foto> {
        const foto = await this.fotoRepository.findOne({ where: { id: fotoId } });
        if (!foto) throw new NotFoundException("Foto not found");

        const album = await this.albumRepository.findOne({ where: { id: albumId } });
        if (!album) throw new NotFoundException("Album not found");

        const fotoDate = new Date(foto.fecha); 
        const albumStartDate = new Date(album.fechaInicio);
        const albumEndDate = new Date(album.fechaFin);

        // Verificar que la fecha de la foto está entre la fecha de inicio y fin del álbum
        if (fotoDate < albumStartDate || fotoDate > albumEndDate) {
            throw new BadRequestException('La fecha de la foto debe estar entre las fechas de inicio y fin del álbum');
        }

        foto.album = album;
        return this.fotoRepository.save(foto);
    }

    async findFotosByAlbumId(albumId: number): Promise<Foto[]> {
        const album = await this.albumRepository.findOne({
            where: { id: albumId },
            relations: ["fotos"]
        });
        if (!album) throw new Error("Album not found");

        return album.fotos;
    }

    async removeFotoFromAlbum(fotoId: number): Promise<Foto> {
        const foto = await this.fotoRepository.findOne({ where: { id: fotoId }, relations: ["album"] });
        if (!foto) throw new Error("Foto not found");

        foto.album = null;
        return this.fotoRepository.save(foto);
    }

    async updateFotoAlbum(fotoId: number, albumId: number): Promise<Foto> {
        const foto = await this.fotoRepository.findOne({ where: { id: fotoId } });
        if (!foto) throw new Error("Foto not found");

        const album = await this.albumRepository.findOne({ where: { id: albumId } });
        if (!album) throw new Error("Album not found");

        foto.album = album;
        return this.fotoRepository.save(foto);
    }
}
