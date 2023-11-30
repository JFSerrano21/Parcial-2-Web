import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { UsuarioEntity } from '../usuarioentity/usuarioentity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class UsuarioserviceService  {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
    ) {}

    async findAll(): Promise<UsuarioEntity[]> {
        return await this.usuarioRepository.find({ relations:  ['Redsocial','fotos' , 'albumes'] });
    }
    async findById(id: Long): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id}, relations: ['Redsocial','fotos' , 'albumes'] });
        if (!usuario) 
        throw new BusinessLogicException('The usuario with the given id was not found', BusinessError.NOT_FOUND); 
        return usuario;
    }

    async create(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        return await this.usuarioRepository.save(usuario);
    }

    async update(id: Long, usuario: UsuarioEntity): Promise<UsuarioEntity> {
        const pesistedUsuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id}});
        if (!pesistedUsuario) 
        throw new BusinessLogicException('The usuario with the given id was not found', BusinessError.NOT_FOUND); 
        usuario.id = id;
        return await this.usuarioRepository.save(usuario);
    }


    async delete(id: Long){
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id}});
        if (!usuario) 
        throw new BusinessLogicException('The usuario with the given id was not found', BusinessError.NOT_FOUND); 
        await this.usuarioRepository.remove(usuario);
    }
}
