import { Column, Entity, Long, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Redsocialentity } from 'src/redsocial/redsocialentity/redsocialentity';
import { UsuarioEntity } from 'src/usuario/usuarioentity/usuarioentity';
import { AlbumEntity } from 'src/album/albumentity/albumentity';

@Entity()
export class FotoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: Long;

    @Column()
    ISO: number;

    @Column()
    velObturacion: number;

    @Column()
    apertura : number;

    @Column()
    fecha : String;

    @ManyToOne(() => Redsocialentity, (redsocial) => redsocial.fotos)
    redsocial: Redsocialentity;

    @ManyToOne(() => UsuarioEntity, (usuario) => usuario.fotos)
    usuario: UsuarioEntity;

    @ManyToOne(() => AlbumEntity, (album) => album.fotos)
    album: AlbumEntity;
}