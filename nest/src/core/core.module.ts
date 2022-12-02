import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config';
import { ApiService, FFmpegService, YoutubeService } from './service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
    }),
  ],
  providers: [Logger, ConfigService, ApiService, FFmpegService, YoutubeService],
  exports: [Logger, ConfigService, ApiService, FFmpegService, YoutubeService],
})
export class CoreModule {}
