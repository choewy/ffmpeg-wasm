#!/bin/sh

M3U8=./assets/CsMF-wpuyulv3k6I03QeUafRjASRyFaS_Zlx7CxJMw8ACRQgTAEOFKlbahW5809NuRyERhHAtcGRK6ABfXQ8bFqh89Z6JF6ChpTxz1s5y_DEZggZ4qpZPfvXJ_pSnlEwLGZB1_Ieywdk83FBWf9ExcfOBYILVGFZoD5qAXdeIa-UXEMgyin5TD6w6mneSguvW0AKzyWy09U9Fr1dIsgYR6qUT6YjSAhNQN6rIC9DVsrSZYuRr.ts
CONCAT=./assets/concat.ts
MP4=output.mp4

DURATION=60

if [ -e $MP4 ]; then
  rm $MP4
fi 

cat ./assets/*.ts > $CONCAT
ffmpeg -i $CONCAT -bsf:a aac_adtstoasc -vcodec copy -crf 50 $MP4