import { useState, useCallback } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const requestURL = 'http://localhost:30001/api/file';
const ffmpeg = createFFmpeg({ log: true });

export const useMp4Transcode = (): [string, string, () => Promise<void>] => {
  const [message, setMessage] = useState<string>('');
  const [src, setSrc] = useState<string>('');

  const callback = useCallback(async () => {
    try {
      setMessage('Loading Ffmpeg-wasm...');
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
      }

      ffmpeg.setProgress(({ ratio }) => console.log(ratio));

      setMessage('Getting ts source file...');
      ffmpeg.FS('writeFile', 'concat.ts', await fetchFile(requestURL));

      setMessage('Transcoding...');
      await ffmpeg.run(
        '-i',
        'concat.ts',
        '-bsf:a',
        'aac_adtstoasc',
        '-vcodec',
        'copy',
        '-c',
        'copy',
        '-crf',
        '50',
        '-t',
        '60',
        'temp.mp4',
      );

      setMessage('Load mp4 buffer...');
      setSrc(
        URL.createObjectURL(
          new Blob([ffmpeg.FS('readFile', 'temp.mp4').buffer], {
            type: 'video/mp4',
          }),
        ),
      );

      setMessage('Complete');
    } catch (e) {
      setMessage(`Error : ${e}`);
    }
  }, [setMessage, setSrc]);

  return [message, src, callback];
};
