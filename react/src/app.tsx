import { useState } from 'react';
import { fetchFile } from '@ffmpeg/ffmpeg';
import { m3u8Service, ffmpegService } from './service';

export const App = () => {
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [message, setMessage] = useState<string>('Click Start to transcode');

  const doTranscode = async () => {
    setMessage('Loading');
    await ffmpegService.init();

    setMessage('Start');
    const file = (await m3u8Service.download()) as unknown as string;
    await ffmpegService.write('test.m3u8', await fetchFile(file));

    try {
      await ffmpegService.run(
        '-i',
        'test.m3u8',
        '-bsf:a',
        'aac_adtstoasc',
        '-vcodec',
        'copy',
        '-c',
        'copy',
        '-crf',
        '50',
        '-t',
        '5',
        'test.mp4',
      );

      setMessage('Complete');
      const mp4Buffer = await ffmpegService.read('test.mp4');
      const mp4Src = await ffmpegService.toMp4Src(mp4Buffer);
      setVideoSrc(mp4Src);
    } catch (e) {
      setMessage(`Fail : ${e}`);
    }
  };

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <br />
      <video src={videoSrc} controls />
      <button onClick={doTranscode}>Start</button>
      <br />
      <p>{message}</p>
    </div>
  );
};
