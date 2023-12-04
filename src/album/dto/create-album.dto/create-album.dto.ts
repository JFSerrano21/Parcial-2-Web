import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  readonly titulo: string;

  @IsNotEmpty()
  @IsDateString()
  readonly fechaInicio: Date;

  @IsOptional()
  @IsDateString()
  readonly fechaFin?: Date;

}
