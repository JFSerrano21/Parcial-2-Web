import {Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Album } from 'src/album/album';
import { RedSocial } from 'src/red-social/red-social';
import { Foto } from 'src/foto/foto';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    telefono: string;

    @ManyToOne(() => RedSocial, (redSocial) => redSocial.usuarios)
    redSocial: RedSocial;
      
    @OneToMany(() => Foto, (foto) => foto.usuario)
    fotos: Foto[];

    @OneToMany(() => Album, (album) => album.usuario)
    albumes: Album[];
}
