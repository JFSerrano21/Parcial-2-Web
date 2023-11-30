import { Column, Entity, Long, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FotoEntity } from 'src/foto/fotoentity/fotoentity';
import {UsuarioEntity} from 'src/usuario/usuarioentity/usuarioentity';

@Entity()
export class Redsocialentity {
    @PrimaryGeneratedColumn('uuid')
    id: Long;

    @Column()
    nombre: String;

    @Column()
    slogan: String;


  @OneToMany(() => UsuarioEntity, (usuario) => usuario.redsocial)
  usuarios: UsuarioEntity[];

  @OneToMany(() => FotoEntity, (foto) => foto.redsocial)
    fotos: FotoEntity[];
}