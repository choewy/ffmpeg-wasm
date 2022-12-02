import { Controller, Get, OnApplicationBootstrap, Res } from '@nestjs/common';
import { Response } from 'express';
import { YoutubeService } from './core';

@Controller()
export class AppController implements OnApplicationBootstrap {
  constructor(private readonly youtubeService: YoutubeService) {}

  onApplicationBootstrap() {
    this.youtubeService.upload({
      title: `${Date.now()}`,
      description: 'TEST',
      path: './assets/output.mp4',
    });
  }

  @Get()
  async healthCheck() {
    return 'health';
  }

  @Get('ts')
  async fileList(@Res() res: Response) {
    return res.download('./assets/concat.ts');
  }

  @Get('upload')
  async uploadToYoutube(): Promise<void> {
    return this.youtubeService.upload({
      title: `${Date.now()}`,
      description: 'TEST',
      path: './assets/output.mp4',
    });
  }
}
