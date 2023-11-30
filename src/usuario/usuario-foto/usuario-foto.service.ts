
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../usuarioentity/usuarioentity';
import { FotoEntity } from 'src/foto/fotoentity/fotoentity';
import { Repository } from 'typeorm';
import { BusinessError,BusinessLogicException } from 'src/shared/errors/business-errors';

// ------------------------------------------------------------

@Injectable()
export class UsuarioFotoService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
     
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>
    ) {}

    async addFotoUsuario(usuarioId: number, fotoId: number): Promise<UsuarioEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotoId}});
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
       
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["foto","fotos"]}) 
        if (!usuario)
          throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND);
     
        usuario.fotos = [...usuario.fotos, foto];
        return await this.usuarioRepository.save(usuario);
      }
     
    async findFotoByUsuarioIdFotoId(usuarioId: number, fotoId: number): Promise<FotoEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotoId}});
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND)
        
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["foto","fotos"]}); 
        if (!usuario)
          throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND)
    
        const usuarioFoto: FotoEntity = usuario.fotos.find(e => e.id === foto.id);
    
        if (!usuarioFoto)
          throw new BusinessLogicException("The foto with the given id is not associated to the usuario", BusinessError.PRECONDITION_FAILED)
    
        return usuarioFoto;
    }
     
    async findFotosByUsuarioId(usuarioId: number): Promise<FotoEntity[]> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["foto","fotos"]});
        if (!usuario)
          throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND)
        
        return usuario.fotos;
    }
     
    async associateFotosUsuario(usuarioId: number, fotos: FotoEntity[]): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["foto","fotos"]});
     
        if (!usuario)
          throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND)
     
        for (let i = 0; i < fotos.length; i++) {
          const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotos[i].id}});
          if (!foto)
            throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND)
        }
     
        usuario.fotos = fotos;
        return await this.usuarioRepository.save(usuario);
      }
     
    async deleteFotoUsuario(usuarioId: number, fotoId: number){
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotoId}});
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND)
     
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["foto","fotos"]});
        if (!usuario)
          throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND)
     
        const usuarioFoto: FotoEntity = usuario.fotos.find(e => e.id === foto.id);
     
        if (!usuarioFoto)
            throw new BusinessLogicException("The foto with the given id is not associated to the usuario", BusinessError.PRECONDITION_FAILED)

        usuario.fotos = usuario.fotos.filter(e => e.id !== fotoId);
        await this.usuarioRepository.save(usuario);
    }   
}