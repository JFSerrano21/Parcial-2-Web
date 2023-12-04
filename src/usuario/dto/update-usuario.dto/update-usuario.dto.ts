import { IsString, IsOptional } from 'class-validator';

export class UpdateUsuarioDto {
  @IsString()
  @IsOptional()
  readonly nombre?: string;

  @IsString()
  @IsOptional()
  readonly telefono?: string;

}