import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedSocial } from './red-social'
import { Repository } from 'typeorm';
import { CreateRedSocialDto } from './dto/create-red-social.dto/create-red-social.dto';
import { UpdateRedSocialDto } from './dto/update-red-social.dto/update-red-social.dto';

@Injectable()
export class RedSocialService {
  constructor(
    @InjectRepository(RedSocial)
    private readonly redSocialRepository: Repository<RedSocial>,
  ) {}

  // Crear una nueva red social
  async createRedSocial(createRedSocialDto: CreateRedSocialDto): Promise<RedSocial> {
    const newRedSocial = this.redSocialRepository.create(createRedSocialDto);
    return this.redSocialRepository.save(newRedSocial);
  }

  // Obtener todas las redes sociales
  async findAllRedesSociales(): Promise<RedSocial[]> {
    return this.redSocialRepository.find();
  }

  // Obtener una red social por ID
  async findRedSocialById(id: number): Promise<RedSocial> {
    const redSocial = await this.redSocialRepository.findOne({ where: { id } });
    if (!redSocial) {
      throw new NotFoundException(`RedSocial with ID ${id} not found`);
    }
    return redSocial;
  }

  // Actualizar una red social por ID
  async updateRedSocial(id: number, updateRedSocialDto: UpdateRedSocialDto): Promise<RedSocial> {
    const redSocial = await this.findRedSocialById(id);
    Object.assign(redSocial, updateRedSocialDto);
    return this.redSocialRepository.save(redSocial);
  }

  // Eliminar una red social por ID
  async deleteRedSocial(id: number): Promise<void> {
    const result = await this.redSocialRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`RedSocial with ID ${id} not found`);
    }
  }
}
