#!/bin/sh

CONCAT=./assets/concat.ts
MP4=output.mp4

DURATION=60

if [ -e $MP4 ]; then
  rm $MP4
fi 

cat ./assets/*.ts > $CONCAT
ffmpeg -i $CONCAT -bsf:a aac_adtstoasc -vcodec copy -crf 50 $MP4