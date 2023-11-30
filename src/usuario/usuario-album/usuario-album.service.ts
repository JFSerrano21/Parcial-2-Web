
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../usuarioentity/usuarioentity';
import { AlbumEntity } from 'src/album/albumentity/albumentity';
import { Repository } from 'typeorm';
import { BusinessError,BusinessLogicException } from 'src/shared/errors/business-errors';

// ------------------------------------------------------------

@Injectable()
export class UsuarioAlbumService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
     
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ) {}

    async addAlbumUsuario(usuarioId: number, albumId: number): Promise<UsuarioEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}});
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
       
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["album","albums"]}) 
        if (!usuario)
          throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND);
     
        usuario.albums = [...usuario.albums, album];
        return await this.usuarioRepository.save(usuario);
      }
     
    async findAlbumByUsuarioIdAlbumId(usuarioId: number, albumId: number): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}});
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND)
        
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["album","albums"]}); 
        if (!usuario)
          throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND)
    
        const usuarioAlbum: AlbumEntity = usuario.albums.find(e => e.id === album.id);
    
        if (!usuarioAlbum)
          throw new BusinessLogicException("The album with the given id is not associated to the usuario", BusinessError.PRECONDITION_FAILED)
    
        return usuarioAlbum;
    }
     
    async findAlbumsByUsuarioId(usuarioId: number): Promise<AlbumEntity[]> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["album","albums"]});
        if (!usuario)
          throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND)
        
        return usuario.albums;
    }
     
    async associateAlbumsUsuario(usuarioId: number, albums: AlbumEntity[]): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["album","albums"]});
     
        if (!usuario)
          throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND)
     
        for (let i = 0; i < albums.length; i++) {
          const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albums[i].id}});
          if (!album)
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND)
        }
     
        usuario.albums = albums;
        return await this.usuarioRepository.save(usuario);
      }
     
    async deleteAlbumUsuario(usuarioId: number, albumId: number){
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}});
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND)
     
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["album","albums"]});
        if (!usuario)
          throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND)
     
        const usuarioAlbum: AlbumEntity = usuario.albums.find(e => e.id === album.id);
     
        if (!usuarioAlbum)
            throw new BusinessLogicException("The album with the given id is not associated to the usuario", BusinessError.PRECONDITION_FAILED)

        usuario.albums = usuario.albums.filter(e => e.id !== albumId);
        await this.usuarioRepository.save(usuario);
    }   
}