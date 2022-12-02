import { Injectable } from '@nestjs/common';
import * as FFmpeg from 'fluent-ffmpeg';

@Injectable()
export class FFmpegService {
  async transcode(url: string, duration: number): Promise<number> {
    return new Promise((resolve, reject) => {
      let start: Date;

      FFmpeg(url)
        .on('start', () => {
          start = new Date();
        })
        .on('error', (e) => reject(e))
        .on('end', () => {
          resolve((new Date().getTime() - start.getTime()) / 1000);
        })
        .videoCodec('copy')
        .setDuration(duration)
        .outputFormat('mp4')
        .saveToFile('./temp.mp4');
    });
  }
}
