import { IsString, IsOptional, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateRedSocialDto {
  @IsOptional()
  @IsString()
  readonly nombre?: string;

  @IsNotEmpty()
  @MinLength(20, {
    message: 'El slogan debe tener al menos 20 caracteres',
  })
  readonly slogan: string;
}
