import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Foto } from '../foto';
import { RedSocial } from 'src/red-social/red-social';
import { Repository } from 'typeorm';

@Injectable()
export class FotoRedSocialService {
    constructor(
        @InjectRepository(Foto)
        private readonly fotoRepository: Repository<Foto>,

        @InjectRepository(RedSocial)
        private readonly redSocialRepository: Repository<RedSocial>
    ) {}

    async addFotoToRedSocial(fotoId: number, redSocialId: number): Promise<Foto> {
        const foto = await this.fotoRepository.findOne({ where: { id: fotoId } });
        if (!foto) throw new Error("Foto not found");

        const redSocial = await this.redSocialRepository.findOne({ where: { id: redSocialId } });
        if (!redSocial) throw new Error("RedSocial not found");

        foto.redSocial = redSocial;
        return this.fotoRepository.save(foto);
    }

    async findFotosByRedSocialId(redSocialId: number): Promise<Foto[]> {
        const redSocial = await this.redSocialRepository.findOne({
            where: { id: redSocialId },
            relations: ["fotos"]
        });
        if (!redSocial) throw new Error("RedSocial not found");

        return redSocial.fotos;
    }

    async removeFotoFromRedSocial(fotoId: number): Promise<Foto> {
        const foto = await this.fotoRepository.findOne({ where: { id: fotoId }, relations: ["redSocial"] });
        if (!foto) throw new Error("Foto not found");

        foto.redSocial = null;
        return this.fotoRepository.save(foto);
    }

    async updateFotoRedSocial(fotoId: number, redSocialId: number): Promise<Foto> {
        const foto = await this.fotoRepository.findOne({ where: { id: fotoId } });
        if (!foto) throw new Error("Foto not found");

        const redSocial = await this.redSocialRepository.findOne({ where: { id: redSocialId } });
        if (!redSocial) throw new Error("RedSocial not found");

        foto.redSocial = redSocial;
        return this.fotoRepository.save(foto);
    }
}
