#!/bin/sh

LIGHT_MAXID=7

light_max_id() #
{
	echo $LIGHT_MAXID
}

light_set_one() #id, state
{
	local id=$1
	local state=$2
	echo $state > $WWWLIGHT/$id
}

light_get_one() #id
{
	local id=$1
	echo `cat $WWWLIGHT/$id 2>/dev/null`
}
