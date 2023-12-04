import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  // verificar que el telefono sea de 10 caracteres
  @IsString()
  @Length(10, 10, { message: 'El teléfono debe tener exactamente 10 caracteres' })
  readonly telefono: string;

}
