all: 
	$(CC) tcp_socket.c print.c web_agent.c -o web_agent
	$(CC) tcp_socket.c print.c exec_app.c board.c -o board
	$(CC) tcp_socket.c print.c switcher.c -o switcher 

clean:
	@rm -f $(OBJS) web_agent board switcher
