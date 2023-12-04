// update-foto.dto.ts
import { IsNumber, IsDateString, IsOptional } from 'class-validator';

export class UpdateFotoDto {
  @IsOptional()
  @IsNumber()
  readonly ISO?: number;

  @IsOptional()
  @IsNumber()
  readonly velObturacion?: number;

  @IsOptional()
  @IsNumber()
  readonly apertura?: number;

  @IsOptional()
  @IsDateString()
  readonly fecha?: Date;
}
