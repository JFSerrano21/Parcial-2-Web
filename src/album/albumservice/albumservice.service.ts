import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { AlbumEntity } from '../albumentity/albumentity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class AlbumserviceService  {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,
    ) {}

    async findAll(): Promise<AlbumEntity[]> {
        return await this.albumRepository.find({ relations: ['usuario', 'fotos'] });
    }
    async findById(id: Long): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id}, relations: ['usuario', 'fotos'] });
        if (!album) 
        throw new BusinessLogicException('The album with the given id was not found', BusinessError.NOT_FOUND); 
        return album;
    }

    async create(album: AlbumEntity): Promise<AlbumEntity> {
        return await this.albumRepository.save(album);
    }

    async update(id: Long, album: AlbumEntity): Promise<AlbumEntity> {
        const pesistedAlbum: AlbumEntity = await this.albumRepository.findOne({where: {id}});
        if (!pesistedAlbum) 
        throw new BusinessLogicException('The album with the given id was not found', BusinessError.NOT_FOUND); 
        album.id = id;
        return await this.albumRepository.save(album);
    }


    async delete(id: Long){
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id}});
        if (!album) 
        throw new BusinessLogicException('The album with the given id was not found', BusinessError.NOT_FOUND); 
        await this.albumRepository.remove(album);
    }
}
