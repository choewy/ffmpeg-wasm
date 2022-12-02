import base64 from 'base-64';
import { api } from './api';

class M3U8Service {
  private readonly URL =
    'https://video-weaver.sel04.hls.ttvnw.net/v1/playlist/CsgFtVPX5bs_ni2In6S03HanS2YmGySpKefG8ItjmhYxpRnLBZh6_qeuPl_-pZ5BFF3bfXOPCQkL8pPd0qytDCfjYoBqrXKS1OAvIXoCrnkQjcNYCUBmKvXNtXUfidcFJWd2QdVW0yd2CHQq_acc9BgJTH-UwEH9WIJOIfHpsom-WLOoMv3ZWrjQs8xEO8wZkQme4TOg3kpRrcG3TBKiU-KZ3xto4fV2OX-iDNMMFPcA4vQIPfAFwXFlvs741CDi6WfKBsn8gkXJs6Q6vvwXn8No6YLk0eCX1FxvsPT1xAZh_Ij33UIf7R7yOlZxCKcR0Fcc6Vjg01LC9y8C2BqU39J9fUUnVGIb2tO6_RYxDgvfayOpkzgpxzUF56nKHaMfBnOr10TjVjrQfAMH5Xoras7X_PmIhFvgIZTrrdAhMDHhhsefSp65rBWYNZt3YN8OIBddGhFJCeSfJwAS5cJuF94DdoP4BpnuE8jjfsIP-mmuCENHAQeZhoGkvI7uqxHqDX4SCDjt0oxACfJBxIPipmZsUgTRL1Q5rNi3PtLJ0OCITwF859ta79q8lvTOW2CgAmNffZnnePDcDE1Kg8qDuryZ_ZXmOKRwg_hrG-ZaEFkIM3Ac_4B0LViQg832CknTCqO1Uhp9_QdQXkfu01dhN3Yi0C12eYUcpnpgIdZXpYeoqETCsgdT7eurKZ0uYnytBvCsLJJkmJXXVJN_WYP1ReTzIeLGc0sq9Qqa-bUkRtjMmaFvsoRyqzh9WJwyzIyx17C-JkuOMkTY57Ff4OFWSnw812bWgc5F1xcjWnM_mFgXE5pEHSqnA_ws5HfLAXeB3lvg2TdC7_2fMe0wPzRU8sSkn2kpCNf5KzKy2NO_DoOt2krqK9OPkPBZDses3Zi51u0rVyYAOSAdo_mXqIhpCXRAtdu7w8fM0Zo3dKTdegk3wmcRLOTJlhAAvhoMESx8vfg7MguhAOCqIAEqCXVzLXdlc3QtMjCkBQ.m3u8';

  async fetch(): Promise<string> {
    return `data:text/m3u8;base64,${base64.encode(
      await api({
        method: 'GET',
        url: this.URL,
      }),
    )}`;
  }

  async download() {
    return api({
      method: 'GET',
      url: 'http://localhost:30001/ts',
    });
  }
}

export const m3u8Service = new M3U8Service();
