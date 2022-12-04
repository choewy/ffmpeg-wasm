import { useFfmpegSupportStatus, useMp4Transcode } from './hooks';

const App = () => {
  const isSupport = useFfmpegSupportStatus();
  const [message, src, onClickEvent] = useMp4Transcode();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <br />
      <video src={src} controls />
      <button onClick={onClickEvent}>변환</button>
      <br />
      <p>{message}</p>
      <p>supported : {isSupport ? 'O' : 'X'}</p>
    </div>
  );
};

export default App;
