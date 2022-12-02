import { api } from './api';

class M3U8Service {
  async tsList(): Promise<string[]> {
    return api({
      method: 'GET',
      url: 'http://localhost:30001/ts',
    });
  }

  async download(filename: string): Promise<any> {
    return api({
      method: 'GET',
      url: `http://localhost:30001/ts/${filename}`,
    });
  }
}

export const m3u8Service = new M3U8Service();
