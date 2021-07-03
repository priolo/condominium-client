/* eslint eqeqeq: "off" */
import { log } from "@priolo/jon-utils";
import { Ping } from "./ping";
import { Reconnect } from "./reconnect";
import { Commands } from "./commands"
import { Capacitor } from '@capacitor/core'



const optionsDefault = {
	protocol: null,
	host: Capacitor.getPlatform() == "web" ? null : "192.168.8.103",
	port: 8080,
}



export class SocketService {

	constructor(options = optionsDefault) {
		this.options = { ...optionsDefault, ...options }

		const loc = window.location
		if ( !this.options.protocol ) this.options.protocol = loc.protocol == "http:" ? "ws:" : "wss:"
		if ( !this.options.host ) this.options.host = loc.hostname
		if ( !this.options.port ) this.options.port = loc.port

		this.websocket = null
		//this.ping = new Ping(this)
		this.reconnect = new Reconnect(this)
		this.commands = new Commands(this)
	}

	/** ultimo token utilizzato (questo valore è usato per la riconnessione) */
	tokenLast = null

	/** tenta di aprire il socket */
	async connect(token = this.tokenLast) {
		if (this.websocket) return
		if (!token) return
		this.tokenLast = token
		const { protocol, host, port } = this.options

		return new Promise ( (res, rej)=>{
			try {
				this.websocket = new WebSocket(`${protocol}//${host}:${port}?token=${token}`);
				this.websocket.onclose = this.onClose.bind(this);
				//this.websocket.onmessage = this.onMessage.bind(this);
				this.websocket.onerror = this.onError.bind(this);
				this.websocket.onopen = ()=> {
					log("socket:open")
					this.reconnect.stop()
					//this.ping.start()
					res()
				}
			} catch ( error ) {
				rej(error)
			}
		})
	}

	/**
	 * chiude il socket. 
	 * questo scatena l'evento "onClose" che riprova a riconnettere
	 */
	clear() {
		if (!this.websocket) return
		this.websocket.close()
		this.websocket = null
	}

	/**
	 * diconnette e mantiene chiuso il socket (usato nel logout)
	 */
	disconnect() {
		this.tokenLast = null
		this.reconnect.stop()
		this.clear()
	}






	//#region MESSAGES

	/**
	 * Invia un messaggio al server
	 * @param {*} data 
	 */
	 send(data) {
		 if ( typeof data != "string" ) data = JSON.stringify(data)
		this.websocket.send(data)
	}

	/** Invia un messaggio al server e aspetta una risposta */
	async sendAndWait ( action, payload ) {
		return new Promise((res, rej) => {
			this.websocket.once("message", (data) => {
				const jsonData = JSON.parse(data)
				res(jsonData)
			})
			this.websocket.send(JSON.stringify({
				path: "com", action, payload
			}))
	
		})
	}
	
	//#endregion



	//#region SOCKET EVENT

	onClose(e) {
		log("socket:close")
		//this.ping.stop()
		this.reconnect.start()
	}

	// onMessage(e) {
	// 	const data = JSON.parse(e.data)
	// 	log("socket:data:", data)
	// 	this.commands.exe(data)
	// }

	onError(e) {
		log("socket:error:", e)
	}

	//#endregion

}

const ss = new SocketService()
export default ss