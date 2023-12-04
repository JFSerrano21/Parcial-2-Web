import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from 'src/usuario/usuario';
import { Foto } from 'src/foto/foto';

@Entity()
export class RedSocial {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string; 

    @Column()
    slogan: string; 

    @OneToMany(() => Usuario, (usuario) => usuario.redSocial)
    usuarios: Usuario[];
      
    @OneToMany(() => Foto, (foto) => foto.redSocial)
    fotos: Foto[];
}
