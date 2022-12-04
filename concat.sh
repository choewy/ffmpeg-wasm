#!/bin/sh

DIR_NAME=$PWD/temp/20221204164523
TS_LIST=tslist.txt

if [ -f "$DIR_NAME/$TS_LIST" ]; then
  rm $DIR_NAME/$TS_LIST
fi

for filename in `ls ${DIR_NAME}/*.ts | sort -V`; do echo "file '$filename'"; done >> $DIR_NAME/$TS_LIST

ffmpeg -f concat -safe 0 -i $DIR_NAME/$TS_LIST -c copy $DIR_NAME/concat.ts