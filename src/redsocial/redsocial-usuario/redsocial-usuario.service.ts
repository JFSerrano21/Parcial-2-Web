
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Redsocialentity } from '../redsocialentity/redsocialentity';
import { UsuarioEntity } from 'src/usuario/usuarioentity/usuarioentity';
import { Repository } from 'typeorm';
import { BusinessError,BusinessLogicException } from 'src/shared/errors/business-errors';

// ------------------------------------------------------------

@Injectable()
export class RedsocialUsuarioService {
    constructor(
        @InjectRepository(Redsocialentity)
        private readonly redsocialRepository: Repository<Redsocialentity>,
     
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) {}

    async addUsuarioRedsocial(redsocialId: number, usuarioId: number): Promise<Redsocialentity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}});
        if (!usuario)
          throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND);
       
        const redsocial: Redsocialentity = await this.redsocialRepository.findOne({where: {id: redsocialId}, relations: ["usuario","usuarios"]}) 
        if (!redsocial)
          throw new BusinessLogicException("The redsocial with the given id was not found", BusinessError.NOT_FOUND);
     
        redsocial.usuarios = [...redsocial.usuarios, usuario];
        return await this.redsocialRepository.save(redsocial);
      }
     
    async findUsuarioByRedsocialIdUsuarioId(redsocialId: number, usuarioId: number): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}});
        if (!usuario)
          throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND)
        
        const redsocial: Redsocialentity = await this.redsocialRepository.findOne({where: {id: redsocialId}, relations: ["usuario","usuarios"]}); 
        if (!redsocial)
          throw new BusinessLogicException("The redsocial with the given id was not found", BusinessError.NOT_FOUND)
    
        const redsocialUsuario: UsuarioEntity = redsocial.usuarios.find(e => e.id === usuario.id);
    
        if (!redsocialUsuario)
          throw new BusinessLogicException("The usuario with the given id is not associated to the redsocial", BusinessError.PRECONDITION_FAILED)
    
        return redsocialUsuario;
    }
     
    async findUsuariosByRedsocialId(redsocialId: number): Promise<UsuarioEntity[]> {
        const redsocial: Redsocialentity = await this.redsocialRepository.findOne({where: {id: redsocialId}, relations: ["usuario","usuarios"]});
        if (!redsocial)
          throw new BusinessLogicException("The redsocial with the given id was not found", BusinessError.NOT_FOUND)
        
        return redsocial.usuarios;
    }
     
    async associateUsuariosRedsocial(redsocialId: number, usuarios: UsuarioEntity[]): Promise<Redsocialentity> {
        const redsocial: Redsocialentity = await this.redsocialRepository.findOne({where: {id: redsocialId}, relations: ["usuario","usuarios"]});
     
        if (!redsocial)
          throw new BusinessLogicException("The redsocial with the given id was not found", BusinessError.NOT_FOUND)
     
        for (let i = 0; i < usuarios.length; i++) {
          const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarios[i].id}});
          if (!usuario)
            throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND)
        }
     
        redsocial.usuarios = usuarios;
        return await this.redsocialRepository.save(redsocial);
      }
     
    async deleteUsuarioRedsocial(redsocialId: number, usuarioId: number){
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}});
        if (!usuario)
          throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND)
     
        const redsocial: Redsocialentity = await this.redsocialRepository.findOne({where: {id: redsocialId}, relations: ["usuario","usuarios"]});
        if (!redsocial)
          throw new BusinessLogicException("The redsocial with the given id was not found", BusinessError.NOT_FOUND)
     
        const redsocialUsuario: UsuarioEntity = redsocial.usuarios.find(e => e.id === usuario.id);
     
        if (!redsocialUsuario)
            throw new BusinessLogicException("The usuario with the given id is not associated to the redsocial", BusinessError.PRECONDITION_FAILED)

        redsocial.usuarios = redsocial.usuarios.filter(e => e.id !== usuarioId);
        await this.redsocialRepository.save(redsocial);
    }   
}