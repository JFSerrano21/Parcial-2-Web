
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from '../albumentity/albumentity';
import { FotoEntity } from 'src/foto/fotoentity/fotoentity';
import { Repository } from 'typeorm';
import { BusinessError,BusinessLogicException } from 'src/shared/errors/business-errors';

// ------------------------------------------------------------

@Injectable()
export class AlbumFotoService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,
     
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>
    ) {}

    async addFotoAlbum(albumId: string, fotoId: number): Promise<AlbumEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotoId}});
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
       
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ["usuario","fotos"]}) 
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
     
        album.fotos = [...album.fotos, foto];
        return await this.albumRepository.save(album);
      }
     
    async findFotoByAlbumIdFotoId(albumId: string, fotoId: number): Promise<FotoEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotoId}});
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND)
        
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ["usuario","fotos"]}); 
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND)
    
        const albumFoto: FotoEntity = album.fotos.find(e => e.id === foto.id);
    
        if (!albumFoto)
          throw new BusinessLogicException("The foto with the given id is not associated to the album", BusinessError.PRECONDITION_FAILED)
    
        return albumFoto;
    }
     
    async findFotosByAlbumId(albumId: string): Promise<FotoEntity[]> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ["usuario","fotos"]});
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND)
        
        return album.fotos;
    }
     
    async associateFotosAlbum(albumId: string, fotos: FotoEntity[]): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ["usuario","fotos"]});
     
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND)
     
        for (let i = 0; i < fotos.length; i++) {
          const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotos[i].id}});
          if (!foto)
            throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND)
        }
     
        album.fotos = fotos;
        return await this.albumRepository.save(album);
      }
     
    async deleteFotoAlbum(albumId: string, fotoId: number){
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotoId}});
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND)
     
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ["usuario","fotos"]});
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND)
     
        const albumFoto: FotoEntity = album.fotos.find(e => e.id === foto.id);
     
        if (!albumFoto)
            throw new BusinessLogicException("The foto with the given id is not associated to the album", BusinessError.PRECONDITION_FAILED)

        album.fotos = album.fotos.filter(e => e.id !== fotoId);
        await this.albumRepository.save(album);
    }   
}