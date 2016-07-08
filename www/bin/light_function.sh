#!/bin/sh

SIM_LIGHT_NUM=6

light_num() #
{
	echo $SIM_LIGHT_NUM
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
