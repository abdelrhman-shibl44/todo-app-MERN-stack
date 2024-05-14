import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { LinkedinService } from './linkedin.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('linkedin')
export class LinkedinController {
  constructor(private linkedinService: LinkedinService) {}

  @Get('/profile')
  @UseGuards(AuthGuard())
  async getUserProfile(
    @Param('profileName') profileName: string,
  ): Promise<any> {
    return this.linkedinService.getUserProfile(profileName);
  }
}
