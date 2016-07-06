#!/bin/sh

GPIO_GET=/home/ihome/yunuo/bin/gpio_get
GPIO_SET=/home/ihome/yunuo/bin/gpio_set

LIGHT_MAXID=7

light_max_id() #
{
	echo $LIGHT_MAXID
}

light_set_one() #id, state
{
	local id=$1
	local state=$2
	$GPIO_SET $id $state
}

light_get_one() #id
{
	echo `$GPIO_GET $id`
}
