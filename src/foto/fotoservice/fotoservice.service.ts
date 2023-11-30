import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { FotoEntity } from '../fotoentity/fotoentity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class FotoserviceService  {
    constructor(
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>,
    ) {}

    async findAll(): Promise<FotoEntity[]> {
        return await this.fotoRepository.find({ relations:  ['redsocial','usuario', 'album'] });
    }
    async findById(id: Long): Promise<FotoEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id}, relations: ['redsocial','usuario', 'album'] });
        if (!foto) 
        throw new BusinessLogicException('The foto with the given id was not found', BusinessError.NOT_FOUND); 
        return foto;
    }

    async create(foto: FotoEntity): Promise<FotoEntity> {
        return await this.fotoRepository.save(foto);
    }

    async update(id: Long, foto: FotoEntity): Promise<FotoEntity> {
        const pesistedFoto: FotoEntity = await this.fotoRepository.findOne({where: {id}});
        if (!pesistedFoto) 
        throw new BusinessLogicException('The foto with the given id was not found', BusinessError.NOT_FOUND); 
        foto.id = id;
        return await this.fotoRepository.save(foto);
    }


    async delete(id: Long){
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id}});
        if (!foto) 
        throw new BusinessLogicException('The foto with the given id was not found', BusinessError.NOT_FOUND); 
        await this.fotoRepository.remove(foto);
    }
}
