import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateRedSocialDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @MinLength(20, {
    message: 'El slogan debe tener al menos 20 caracteres',
  })
  readonly slogan: string;
}
