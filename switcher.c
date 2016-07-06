#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "print.h"
#include "config.h"
#include "tcp_socket.h"

static struct tcp_socket_conn *conn_server_for_board = NULL;
static struct tcp_socket_conn *conn_server_for_web = NULL;
static char buf[BUF_SIZE];

static void run_server(void)
{
	int ret;

	while (1) {
	  wait_board_connection:

		trc_printf("wating a board connection\n");

		conn_server_for_board = tcp_socket_accept_connection(SWITCHER_SERVER_IP, SWITCHER_SERVER_PORT_FOR_BOARD);
		if (!conn_server_for_board) {
			dbg_printf("cannot accept board connection\n");
			continue;
		}

		trc_printf("accept a board connection\n");

		while (1) {

			trc_printf("wating a web agent connection\n");

			conn_server_for_web = tcp_socket_accept_connection(SWITCHER_SERVER_IP, SWITCHER_SERVER_PORT_FOR_WEB_AGENT);
			if (!conn_server_for_web) {
				dbg_printf("cannot accept web agent connection\n");
				continue;
			}

			trc_printf("accept a web agent connection\n");

			while (1) {
				memset(buf, 0, BUF_SIZE);
				ret = tcp_socket_recv(conn_server_for_web, buf, BUF_SIZE);
				if (ret <= 0) {
					dbg_printf("receive data from web agent failed\n");
					tcp_socket_conn_free(conn_server_for_web);
					break;
				}
				ret = tcp_socket_send(conn_server_for_board, buf, ret);
				if (ret <= 0) {
					dbg_printf("send web agent data to board failed\n");
					tcp_socket_conn_free(conn_server_for_web);
					break;
				}

				memset(buf, 0, BUF_SIZE);
				ret = tcp_socket_recv(conn_server_for_board, buf, BUF_SIZE);
				if (ret <= 0) {
					dbg_printf("receive data from board failed\n");
					tcp_socket_conn_free(conn_server_for_board);
					tcp_socket_conn_free(conn_server_for_web);
					goto wait_board_connection;
				}
				ret = tcp_socket_send(conn_server_for_web, buf, ret);
				if (ret <= 0) {
					dbg_printf("send board data to web agent failed\n");
					tcp_socket_conn_free(conn_server_for_board);
					tcp_socket_conn_free(conn_server_for_web);
					goto wait_board_connection;
				}
			}
		}
	}
}

int main(int argc, char *argv[])
{
	trc_printf("welcome to switcher!\n");
	run_server();
	return 0;
}
