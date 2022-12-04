export const useFfmpegSupportStatus = (): boolean => {
  return window.SharedArrayBuffer !== undefined;
};
