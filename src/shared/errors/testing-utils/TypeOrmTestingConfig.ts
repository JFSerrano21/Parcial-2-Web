import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from 'src/album/album';
import { Foto } from 'src/foto/foto';
import { RedSocial } from 'src/red-social/red-social';
import { Usuario } from 'src/usuario/usuario';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite', 
    database: ':memory:',  
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    synchronize: true, 
    dropSchema: true, 
  }),
  TypeOrmModule.forFeature([Album, Foto, RedSocial, Usuario]), 
];