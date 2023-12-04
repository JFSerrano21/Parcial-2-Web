import {Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

import { Foto } from 'src/foto/foto';
import { Usuario } from 'src/usuario/usuario';

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('date')
    fechaInicio: Date;

    @Column('date')
    fechaFin: Date;
  
  
    @OneToMany(() => Foto, (foto) => foto.album)
    fotos: Foto[];

    @ManyToOne(() => Usuario, (usuario) => usuario.albumes)
    usuario: Usuario;
  }