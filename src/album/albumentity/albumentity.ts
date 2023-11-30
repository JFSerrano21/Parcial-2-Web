import { Column, Entity, Long, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from 'src/usuario/usuarioentity/usuarioentity';
import { FotoEntity } from 'src/foto/fotoentity/fotoentity';

@Entity()
export class AlbumEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    fechaInicio: String;

    @Column()
    fechaFin: String;

    @Column()
    titulo : String;

    @ManyToOne(() => UsuarioEntity, (usuario) => usuario.albumes)
    usuario: UsuarioEntity;

    @OneToMany (() => FotoEntity, (foto) => foto.album)
    fotos: FotoEntity[];

}