/* eslint eqeqeq: "off" */
import { log } from "@priolo/jon-utils"



const optionsDefault = {
	checkDelay: 2000,
}

export class Ping {

	constructor(server, options = optionsDefault) {
		this.options = { ...optionsDefault, ...options }
		this.server = server
		this.onMessage = this.onMessage.bind(this)
	}

	/** ID del timeout */
	timeoutId = null

	/** data dell'ultimo controllo andato a buon fine */
	checkLastTime = null


	/**
	 * Avvia il ping al server
	 * invio il ping
	 */
	start() {
		this.stop()
		this.checkLastTime = Date.now()
		this.server.websocket.once("message", this.onMessage)
		this.timeoutId = setTimeout(this.onTimeout.bind(this), this.options.checkDelay)
		this.server.websocket.send("ping")
	}

	/**
	 * Ferma il ping
	 */
	stop() {
		this.server.websocket.off("message", this.onMessage)
		if (!this.timeoutId) return
		clearTimeout(this.timeoutId)
		this.timeoutId = null
	}

	/**
	 * Se viene richiamato questo evento evidenemente è passato troppo tempo dall'ultimo messaggio ricevuto dal client
	 * Il server quindi è offline
	 */
	onTimeout() {
		log ("ping:offline")
		this.stop()
	}

	/**
	 * Richiamato quando c'e' un messaggio
	 */
	onMessage() {
		const current = Date.now()
		const delta = current - this.checkLastTime
		log (`ping:online:${delta}`)
		this.start()
	}

}