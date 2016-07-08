#!/bin/sh

GPIO_GET=/usr/local/sbin/gpio_get
GPIO_SET=/usr/local/sbin/gpio_set

YUNUO_LIGHT_NUM=8

light_num() #
{
	echo $YUNUO_LIGHT_NUM
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
