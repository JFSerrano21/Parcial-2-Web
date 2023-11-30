
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Redsocialentity } from '../redsocialentity/redsocialentity';
import { FotoEntity } from 'src/foto/fotoentity/fotoentity';
import { Repository } from 'typeorm';
import { BusinessError,BusinessLogicException } from 'src/shared/errors/business-errors';

// ------------------------------------------------------------

@Injectable()
export class RedsocialFotoService {
    constructor(
        @InjectRepository(Redsocialentity)
        private readonly redsocialRepository: Repository<Redsocialentity>,
     
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>
    ) {}

    async addFotoRedsocial(redsocialId: number, fotoId: number): Promise<Redsocialentity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotoId}});
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
       
        const redsocial: Redsocialentity = await this.redsocialRepository.findOne({where: {id: redsocialId}, relations: ["usuario","fotos"]}) 
        if (!redsocial)
          throw new BusinessLogicException("The redsocial with the given id was not found", BusinessError.NOT_FOUND);
     
        redsocial.fotos = [...redsocial.fotos, foto];
        return await this.redsocialRepository.save(redsocial);
      }
     
    async findFotoByRedsocialIdFotoId(redsocialId: number, fotoId: number): Promise<FotoEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotoId}});
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND)
        
        const redsocial: Redsocialentity = await this.redsocialRepository.findOne({where: {id: redsocialId}, relations: ["usuario","fotos"]}); 
        if (!redsocial)
          throw new BusinessLogicException("The redsocial with the given id was not found", BusinessError.NOT_FOUND)
    
        const redsocialFoto: FotoEntity = redsocial.fotos.find(e => e.id === foto.id);
    
        if (!redsocialFoto)
          throw new BusinessLogicException("The foto with the given id is not associated to the redsocial", BusinessError.PRECONDITION_FAILED)
    
        return redsocialFoto;
    }
     
    async findFotosByRedsocialId(redsocialId: number): Promise<FotoEntity[]> {
        const redsocial: Redsocialentity = await this.redsocialRepository.findOne({where: {id: redsocialId}, relations: ["usuario","fotos"]});
        if (!redsocial)
          throw new BusinessLogicException("The redsocial with the given id was not found", BusinessError.NOT_FOUND)
        
        return redsocial.fotos;
    }
     
    async associateFotosRedsocial(redsocialId: number, fotos: FotoEntity[]): Promise<Redsocialentity> {
        const redsocial: Redsocialentity = await this.redsocialRepository.findOne({where: {id: redsocialId}, relations: ["usuario","fotos"]});
     
        if (!redsocial)
          throw new BusinessLogicException("The redsocial with the given id was not found", BusinessError.NOT_FOUND)
     
        for (let i = 0; i < fotos.length; i++) {
          const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotos[i].id}});
          if (!foto)
            throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND)
        }
     
        redsocial.fotos = fotos;
        return await this.redsocialRepository.save(redsocial);
      }
     
    async deleteFotoRedsocial(redsocialId: number, fotoId: number){
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotoId}});
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND)
     
        const redsocial: Redsocialentity = await this.redsocialRepository.findOne({where: {id: redsocialId}, relations: ["usuario","fotos"]});
        if (!redsocial)
          throw new BusinessLogicException("The redsocial with the given id was not found", BusinessError.NOT_FOUND)
     
        const redsocialFoto: FotoEntity = redsocial.fotos.find(e => e.id === foto.id);
     
        if (!redsocialFoto)
            throw new BusinessLogicException("The foto with the given id is not associated to the redsocial", BusinessError.PRECONDITION_FAILED)

        redsocial.fotos = redsocial.fotos.filter(e => e.id !== fotoId);
        await this.redsocialRepository.save(redsocial);
    }   
}