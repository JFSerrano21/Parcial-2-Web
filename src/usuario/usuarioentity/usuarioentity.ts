import { Column, Entity, Long, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FotoEntity } from 'src/foto/fotoentity/fotoentity';
import { Redsocialentity } from 'src/redsocial/redsocialentity/redsocialentity';
import { AlbumEntity } from 'src/album/albumentity/albumentity';
@Entity()
export class UsuarioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: Long;

    @Column()
    nombre: String;

    @Column()
    telefono: String;

    @OneToMany(() => FotoEntity, (foto) => foto.usuario)
    fotos: FotoEntity[];

    @ManyToOne(() => Redsocialentity, (redsocial) => redsocial.usuarios)
    redsocial: Redsocialentity;

    @OneToMany (() => AlbumEntity, (album) => album.usuario)
    albumes: AlbumEntity[];

}