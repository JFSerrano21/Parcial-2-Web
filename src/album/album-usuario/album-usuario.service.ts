import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from '../album';
import { Usuario } from 'src/usuario/usuario';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumUsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,

        @InjectRepository(Album)
        private readonly albumRepository: Repository<Album>
    ) {}

    async addUsuarioToAlbum(albumId: number, usuarioId: number): Promise<Album> {
        const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
        if (!usuario) throw new Error("Usuario not found");

        const album = await this.albumRepository.findOne({ where: { id: albumId } });
        if (!album) throw new Error("Album not found");

        album.usuario = usuario;
        return this.albumRepository.save(album);
    }

    async findAlbumsByUsuarioId(usuarioId: number): Promise<Album[]> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioId },
            relations: ["albumes"]
        });
        if (!usuario) throw new Error("Usuario not found");

        return usuario.albumes;
    }

    async removeUsuarioFromAlbum(albumId: number, usuarioId: number): Promise<Album> {
        const album = await this.albumRepository.findOne({ where: { id: albumId } });
        if (!album) throw new Error("Album not found");

        if (!album.usuario || album.usuario.id !== usuarioId) throw new Error("Usuario not associated with this album");

        album.usuario = null;
        return this.albumRepository.save(album);
    }

    async updateAlbumUsuario(albumId: number, usuarioId: number): Promise<Album> {
        const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
        if (!usuario) throw new Error("Usuario not found");

        const album = await this.albumRepository.findOne({ where: { id: albumId } });
        if (!album) throw new Error("Album not found");

        album.usuario = usuario;
        return this.albumRepository.save(album);
    }
}
