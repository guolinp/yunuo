#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "print.h"
#include "config.h"
#include "tcp_socket.h"

static struct tcp_socket_conn *conn_client_for_web = NULL;
static char buf[BUF_SIZE];

static void run_client(char *message)
{
	int ret;

	conn_client_for_web = tcp_socket_connect(SWITCHER_SERVER_IP, SWITCHER_SERVER_PORT_FOR_WEB_AGENT);
	if (!conn_client_for_web) {
		dbg_printf("connect switcher failed\n");
		return;
	}

	do {
		ret = tcp_socket_send(conn_client_for_web, message, strlen(message));
		if (ret <= 0) {
			dbg_printf("send data to switcher failed\n");
			break;
		}
		ret = tcp_socket_recv(conn_client_for_web, buf, BUF_SIZE);
		if (ret <= 0) {
			dbg_printf("receive data from switcher failed\n");
		} else {
			trc_printf("%s", buf);
		}
	} while (0);

	tcp_socket_conn_free(conn_client_for_web);
}

int main(int argc, char *argv[])
{
	//trc_printf("welcome to web agent!\n");
	if (argv[1])
		run_client(argv[1]);
	else
		printf("Usage: %s <message>\n", argv[0]);
	return 0;
}
