import { Module } from '@nestjs/common';
import { RedsocialFotoService } from './redsocial-foto.service';

@Module({
  providers: [RedsocialFotoService]
})
export class RedsocialFotoModule {}
