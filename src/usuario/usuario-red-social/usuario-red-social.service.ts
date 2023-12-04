import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../usuario';
import { RedSocial } from 'src/red-social/red-social';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioRedSocialService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,

        @InjectRepository(RedSocial)
        private readonly redSocialRepository: Repository<RedSocial>
    ) {}

    async addUsuarioToRedSocial(usuarioId: number, redSocialId: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
        if (!usuario) throw new Error("Usuario not found");

        const redSocial = await this.redSocialRepository.findOne({ where: { id: redSocialId } });
        if (!redSocial) throw new Error("RedSocial not found");

        usuario.redSocial = redSocial;
        return this.usuarioRepository.save(usuario);
    }

    async findUsuariosByRedSocialId(redSocialId: number): Promise<Usuario[]> {
        const redSocial = await this.redSocialRepository.findOne({
            where: { id: redSocialId },
            relations: ["usuarios"]
        });
        if (!redSocial) throw new Error("RedSocial not found");

        return redSocial.usuarios;
    }

    async removeUsuarioFromRedSocial(usuarioId: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId }, relations: ["redSocial"] });
        if (!usuario) throw new Error("Usuario not found");

        usuario.redSocial = null;
        return this.usuarioRepository.save(usuario);
    }

    async updateUsuarioRedSocial(usuarioId: number, redSocialId: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
        if (!usuario) throw new Error("Usuario not found");

        const redSocial = await this.redSocialRepository.findOne({ where: { id: redSocialId } });
        if (!redSocial) throw new Error("RedSocial not found");

        usuario.redSocial = redSocial;
        return this.usuarioRepository.save(usuario);
    }
}
