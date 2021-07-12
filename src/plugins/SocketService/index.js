import { SocketService } from "./SocketService";
import { SocketCommandService } from "./SocketCommandService";

const socketService = new SocketService()
const socketCommandService = new SocketCommandService(socketService)

const SOCKET_STATE = {
	CONNECT: 0,
	WARNING: 1,
	ERROR: 2,
	CONNECT_ERROR_PING: 3
}

const ACTIONS_TO_CLIENT = {
	CLIENTS_NEAR: "clients_near",
	MESSAGES_NEAR: "messages_near",
	MESSAGE: "message",
}

const ACTIONS_FROM_CLIENT = {
	POSITION: "position",
	MESSAGE: "message",
	MESSAGES: "messages",
	NEAR: "near",
}

export {
	SOCKET_STATE,
	ACTIONS_TO_CLIENT,
	ACTIONS_FROM_CLIENT,
	socketService,
	socketCommandService,
}