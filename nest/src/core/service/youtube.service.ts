import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigKey, YoutubeConfig } from '../config';
import { upload } from 'youtube-videos-uploader';
import { Video } from 'youtube-videos-uploader/dist/types';

@Injectable()
export class YoutubeService {
  private readonly credentials: YoutubeConfig;

  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {
    this.credentials = this.configService.get<YoutubeConfig>(ConfigKey.Youtube);
  }

  async upload(video: Video): Promise<void> {
    upload(this.credentials, [
      {
        ...video,
        channelName: this.credentials.channelName,
        skipProcessingWait: true,
        onSuccess: (url) => {
          this.logger.verbose(`url : ${url}`);
        },
        onProgress: ({ stage, progress }) => {
          switch (stage) {
            case 0:
              return this.logger.verbose(
                `[uploading] ${video.title} : ${progress}%`,
              );

            case 1:
              return this.logger.verbose(
                `[processing] ${video.title} : ${progress}%`,
              );

            case 2:
              return this.logger.verbose(
                `[done] ${video.title} : ${progress}%`,
              );
          }
        },
      },
    ]);
  }
}
