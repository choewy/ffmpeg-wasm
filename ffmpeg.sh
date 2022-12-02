#!/bin/sh

M3U8=https://video-weaver.sel03.hls.ttvnw.net/v1/playlist/CrsFXJu5EaPur6f38EQUP1XLe_Zyop0L4KPOX6sgC1GKJYMeDLRBiOe_KorNXFA6jSYbUcMGcdGVxwaWbRDahHW1FY5E1S1KSw_lVEwhd4LbIiw_0wt4OjvZDwLHxHpaxgOQtAY3wWvyKdfYEl-pfepjBAC9W2QNDmkRwh77R-eL0nlMBywH1pezRGX2tUnEec6Ku8Su7BTnzqYSVFHhKLnv4AatamZkR9uQuZQn-hD6Z63pfyHlcQU2GuIq72gCeMfLgkT7Esjpv4xW4l_3sLQ26JEnMzsaG0DunQSgL58aAva3q1iJNBh0HHjCHcMebj-h0WgVGJJ8F6CLVVTgw2L0ox9yzFM2ePG6pOaNkHPNvczYHh9R4WsaE2ydDb0rdD2Ca8Tms1JJEuepDrGBwldSW9NmjdcQoSXG1iHs8PWz1UO23ToBh2fpfGHa-vrim5EsLgco8rv6xKfzE5424aW5Yqcz51IXZ5njeu1WEyYOpMG8orqCTLsisOiMqW-j_RjkB3VMChKT4Q5nhraJenGi28yj0hTRCcWC5Bi8dmylGWqj41KKygeXEPPkuwfw5gQ1WLXrfQe2QPnkgu7NmfDYM8_gXRzvEAFca4Ps6VHI5AOshp5i26OQvcmd7FGIXhZePdz_A49dGMFKqnP0yMTFj5pVQ5zZqCAt1gTFGs2PjYdKkEfhi9ud7hU-rKgcaAyPKosZA6n9Zsd8CUpvuIeEyGO93m3hpszyxj1CRVLx9LVO11Y8pLNigxkIsd9k2dGyR_1P-WuXwEJD8wKEAttjloVdjZcYa2oi7d5Un5IWzFE1gfl0F951hLEYRqbVl2fulhuu_V3PyzOIMCFo5Ub56LDSJvAJbqorCsqoCFAuISUAGy006W6erwneuNFF95oROshjq7i3tG6TUWN7nopk3bo4o-K5CvBn51GKGgzqcQ2UIVHuW_jl51AgASoJdXMtd2VzdC0yMKMF.m3u8
MP4=output.mp4

DURATION=60

if [ -e $MP4 ]; then
  rm $MP4
fi 

ffmpeg -i $M3U8 -bsf:a aac_adtstoasc -vcodec copy -crf 50 -t $DURATION $MP4