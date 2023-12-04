import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Foto } from '../foto';
import { Usuario } from 'src/usuario/usuario';
import { Repository } from 'typeorm';

@Injectable()
export class FotoUsuarioService {
    constructor(
        @InjectRepository(Foto)
        private readonly fotoRepository: Repository<Foto>,

        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>
    ) {}

    async addFotoToUsuario(fotoId: number, usuarioId: number): Promise<Foto> {
        const foto = await this.fotoRepository.findOne({ where: { id: fotoId } });
        if (!foto) throw new Error("Foto not found");

        const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
        if (!usuario) throw new Error("Usuario not found");

        foto.usuario = usuario;
        return this.fotoRepository.save(foto);
    }

    async findFotosByUsuarioId(usuarioId: number): Promise<Foto[]> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioId },
            relations: ["fotos"]
        });
        if (!usuario) throw new Error("Usuario not found");

        return usuario.fotos;
    }

    async removeFotoFromUsuario(fotoId: number): Promise<Foto> {
        const foto = await this.fotoRepository.findOne({ where: { id: fotoId }, relations: ["usuario"] });
        if (!foto) throw new Error("Foto not found");

        foto.usuario = null;
        return this.fotoRepository.save(foto);
    }

    async updateFotoUsuario(fotoId: number, usuarioId: number): Promise<Foto> {
        const foto = await this.fotoRepository.findOne({ where: { id: fotoId } });
        if (!foto) throw new Error("Foto not found");

        const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
        if (!usuario) throw new Error("Usuario not found");

        foto.usuario = usuario;
        return this.fotoRepository.save(foto);
    }
}
