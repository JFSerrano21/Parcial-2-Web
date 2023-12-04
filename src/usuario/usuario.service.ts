import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  // Crear un nuevo usuario
  async createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const newUser = this.usuarioRepository.create(createUsuarioDto);
    return this.usuarioRepository.save(newUser);
  }

  // Obtener todos los usuarios
  async findAllUsuarios(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  // Obtener un usuario por ID
  async findUsuarioById(id: number): Promise<Usuario> {
    const user = await this.usuarioRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario with ID ${id} not found`);
    }
    return user;
  }

  // Actualizar un usuario por ID
  async updateUsuario(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const user = await this.findUsuarioById(id);
    Object.assign(user, updateUsuarioDto);
    return this.usuarioRepository.save(user);
  }

  // Eliminar un usuario por ID
  async deleteUsuario(id: number): Promise<void> {
    const result = await this.usuarioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario with ID ${id} not found`);
    }
  }
}
