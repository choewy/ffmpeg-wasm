import { registerAs } from '@nestjs/config';
import { ConfigKey } from './enums';
import { YoutubeConfig } from './types';

export default registerAs(
  ConfigKey.Youtube,
  (): YoutubeConfig => ({
    email: process.env.YOUTUBE_EMAIL,
    pass: process.env.YOUTUBE_PASSWORD,
    recoveryemail: process.env.YOUTUBE_RECOVERY_EMAIL,
    channelName: process.env.YOUTUBE_CHANNEL_NAME,
  }),
);
