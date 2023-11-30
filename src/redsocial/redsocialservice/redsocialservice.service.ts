import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { Redsocialentity } from '../redSocialentity/redSocialentity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class RedSocialserviceService  {
    constructor(
        @InjectRepository(Redsocialentity)
        private readonly redSocialRepository: Repository<Redsocialentity>,
    ) {}

    async findAll(): Promise<Redsocialentity[]> {
        return await this.redSocialRepository.find({ relations:  ['usuarios','fotos'] });
    }
    async findById(id: Long): Promise<Redsocialentity> {
        const redSocial: Redsocialentity = await this.redSocialRepository.findOne({where: {id}, relations: ['usuarios','fotos'] });
        if (!redSocial) 
        throw new BusinessLogicException('The redSocial with the given id was not found', BusinessError.NOT_FOUND); 
        return redSocial;
    }

    async create(redSocial: Redsocialentity): Promise<Redsocialentity> {
        return await this.redSocialRepository.save(redSocial);
    }

    async update(id: Long, redSocial: Redsocialentity): Promise<Redsocialentity> {
        const pesistedRedSocial: Redsocialentity = await this.redSocialRepository.findOne({where: {id}});
        if (!pesistedRedSocial) 
        throw new BusinessLogicException('The redSocial with the given id was not found', BusinessError.NOT_FOUND); 
        redSocial.id = id;
        return await this.redSocialRepository.save(redSocial);
    }


    async delete(id: Long){
        const redSocial: Redsocialentity = await this.redSocialRepository.findOne({where: {id}});
        if (!redSocial) 
        throw new BusinessLogicException('The redSocial with the given id was not found', BusinessError.NOT_FOUND); 
        await this.redSocialRepository.remove(redSocial);
    }
}
