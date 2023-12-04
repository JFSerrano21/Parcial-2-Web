import { IsNotEmpty, IsNumber, Min, Max , IsDateString} from 'class-validator';

export class CreateFotoDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(100)
  @Max(6400)
  readonly ISO: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(2)
  @Max(250)
  readonly velObturacion: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(32)
  readonly apertura: number;

  @IsNotEmpty()
  @IsDateString()
  readonly fecha: Date;
}
