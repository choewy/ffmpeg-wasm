import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  async healthCheck() {
    return 'health';
  }

  @Get('ts')
  async fileList(@Res() res: Response) {
    return res.download('./assets/concat.ts');
  }
}
