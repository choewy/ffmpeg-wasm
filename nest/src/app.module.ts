import { Logger, Module } from '@nestjs/common';
import { FFmpegService } from './service';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  providers: [Logger, FFmpegService, AppService],
  controllers: [AppController],
})
export class AppModule {}
