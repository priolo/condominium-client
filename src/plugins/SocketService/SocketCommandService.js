/* eslint eqeqeq: "off"*/
import { ACTIONS_FROM_CLIENT } from "."
import SocketService from "./SocketService"


export class SocketCommandService {

	/**
	 * 
	 * @param {SocketService} ss 
	 */
	constructor(ss) {
		this.ss = ss
	}

	/**
	 * 
	 * @param {{x:number,y:number}} position 
	 */
	setPosition(position) {
		this.ss.send({
			path: "com",
			action: ACTIONS_FROM_CLIENT.POSITION,
			payload: position,
		})
	}

	/**
	 * 
	 * @param {string} message 
	 */
	textMessage(message) {
		this.ss.send({
			path: "com", 
			action: ACTIONS_FROM_CLIENT.MESSAGE,
			payload: message,
		})
	}

	/**
	 * 
	 */
	getNearMessages() {
		this.ss.send({
			path: "com", 
			action: ACTIONS_FROM_CLIENT.MESSAGES,
		})
	}

	/**
	 * 
	 */
	getNearClients() {
		this.ss.send({
			path: "com", 
			action: ACTIONS_FROM_CLIENT.NEAR,
		})
	}
}
