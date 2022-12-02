import { useState } from 'react';
import { fetchFile } from '@ffmpeg/ffmpeg';
import { ffmpegService } from './service';

export const App = () => {
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [message, setMessage] = useState<string>('Click Start to transcode');

  const doTranscode = async () => {
    setMessage('Loading');
    await ffmpegService.init();

    setMessage('Get TS files');
    await ffmpegService.write(
      'all.ts',
      await fetchFile('http://localhost:30001/ts'),
    );

    setMessage('Concat');

    try {
      setMessage('Start');
      await ffmpegService.run(
        '-i',
        'all.ts',
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
      setMessage('Complete');
      const mp4Buffer = await ffmpegService.read('temp.mp4');
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
