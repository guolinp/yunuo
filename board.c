#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "print.h"
#include "config.h"
#include "tcp_socket.h"

static struct tcp_socket_conn *conn_client_for_board = NULL;
static char buf[BUF_SIZE];

static int process_message(char *buf)
{
	int ret;

	dbg_printf("message: %s\n", buf);

	ret = exec_app(buf, buf, BUF_SIZE);
	if (ret <= 0)
		ret = snprintf(buf, BUF_SIZE, "Error from yunuo board\n");
	return ret;
}

static void run_client(void)
{
	int ret;
	int try = 0;
	int maxtry = 256;

	while (1) {
		conn_client_for_board = tcp_socket_connect(SWITCHER_SERVER_IP, SWITCHER_SERVER_PORT_FOR_BOARD);
		if (!conn_client_for_board) {
			dbg_printf("connect switcher failed(%d)\n", ++try);
			if (try >= maxtry) {
				dbg_printf("has reached the max try times, exit\n");
				return;
			}
			sleep(1);
			continue;
		}

		while (1) {
			memset(buf, 0, BUF_SIZE);
			ret = tcp_socket_recv(conn_client_for_board, buf, BUF_SIZE);
			if (ret <= 0) {
				dbg_printf("receive data from switcher failed\n");
				break;
			}

			ret = process_message(buf);

			ret = tcp_socket_send(conn_client_for_board, buf, ret);
			if (ret <= 0) {
				dbg_printf("send data to switcher failed\n");
				break;
			}
		}
		tcp_socket_conn_free(conn_client_for_board);
	}
}

int main(int argc, char *argv[])
{
	trc_printf("welcome to yunuo board!\n");
	run_client();
	return 0;
}
