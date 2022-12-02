import { createFFmpeg, FFmpeg } from '@ffmpeg/ffmpeg';

class FFmpegService {
  private ffmpeg: FFmpeg = createFFmpeg({ log: true });

  isSupported() {
    return window.SharedArrayBuffer !== undefined;
  }

  async init(): Promise<void> {
    if (!this.ffmpeg.isLoaded()) {
      return this.ffmpeg.load();
    }

    this.ffmpeg.setProgress(({ ratio }) => {
      console.log(ratio);
    });
  }

  async write(filename: string, arr: Uint8Array): Promise<void> {
    return new Promise((resolve) => {
      this.ffmpeg.FS('writeFile', filename, arr);
      resolve(undefined);
    });
  }

  async read(filename: string): Promise<Uint8Array> {
    return Promise.resolve(this.ffmpeg.FS('readFile', filename));
  }

  async run(...args: string[]) {
    return this.ffmpeg.run(...args);
  }

  async toMp4Src(arr: Uint8Array): Promise<string> {
    return Promise.resolve(
      URL.createObjectURL(
        new Blob([arr.buffer], {
          type: 'video/mp4',
        }),
      ),
    );
  }

  async quit() {
    this.ffmpeg.exit();
  }
}

export const ffmpegService = new FFmpegService();
