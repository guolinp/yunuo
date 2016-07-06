#!/bin/sh

CURRENT=$WWWVAR/.music_current

music_find() #id
{
	local id=$1
	local cnt=0
	local name=""

	for file in `ls $WWWMUSIC/`
	do
		if [ ! -f $WWWMUSIC/$file ]; then
			continue
		fi
		if [ $cnt != $id ]; then
			cnt=$((cnt+1))
			continue
		fi
		name=$file
		break
	done

	echo $name
}

music_play_one() #id
{
	local id=$1
	echo $id > $CURRENT
}

music_stop_one() #id
{
	local id=$1
	echo x > $CURRENT
}

music_current() #
{
	local id=`cat $CURRENT 2>/dev/null`
	echo $id
}
