import { Controller, Post, Body } from '@nestjs/common';
import { RedSocialService } from './red-social.service';
import { CreateRedSocialDto } from './dto/create-red-social.dto/create-red-social.dto';

@Controller('red-social')
export class RedSocialController {
  constructor(private readonly redSocialService: RedSocialService) {}

  @Post()
  createRedSocial(@Body() createRedSocialDto: CreateRedSocialDto) {
    return this.redSocialService.createRedSocial(createRedSocialDto);
  }
}