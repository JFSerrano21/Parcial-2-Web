import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from 'src/album/album';
import { RedSocial } from 'src/red-social/red-social';
import { Usuario } from 'src/usuario/usuario';

@Entity()
export class Foto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ISO: number;

    @Column()
    velObturacion: number;

    @Column()
    apertura: number;

    @Column('date')
    fecha: Date;
  
    @ManyToOne(() => Usuario, (usuario) => usuario.fotos)
    usuario: Usuario;
      
    @ManyToOne(() => RedSocial, (redSocial) => redSocial.fotos)
    redSocial: RedSocial;
      
    @ManyToOne(() => Album, (album) => album.fotos)
    album: Album;
}
