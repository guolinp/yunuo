#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<errno.h>

#include "exec_app.h"

#define MAX_LINE_LEN    512
#define MAX_BUFF_LEN    4096

int exec_app(const char *cmdline, char *buf, int size)
{
	FILE *fp;
	int line_len;
	int payload_len;
	char line_buf[MAX_LINE_LEN];
	char *line_str;

	if (!cmdline || !buf || size <= 0)
		return -EINVAL;

	payload_len = 0;
	fp = popen(cmdline, "r");
	while (1) {
		line_str = fgets(line_buf, MAX_LINE_LEN, fp);
		if (!line_str)
			break;
		line_len = strlen(line_str);
		if (line_len > size - payload_len)
			line_len = size - payload_len;
		memcpy(buf + payload_len, line_str, line_len);
		payload_len += line_len;
	};
	pclose(fp);

	return payload_len;
}
