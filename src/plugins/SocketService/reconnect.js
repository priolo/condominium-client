/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { log } from "@priolo/jon-utils"



const optionsDefault = {
	delay: 3000,
	tryMax: 3,
}



export class Reconnect {

	constructor(server, options = optionsDefault) {
		this.options = { ...optionsDefault, ...options }
		this.server = server
	}

	/** numero di tentativi di riconnessione effettuati */
	try = 0

	/** identificatime del Timeout */
	idTimer = null

	/**
	 * inizia a provare a riconnettersi
	 */
	start() {
		if ( this.try == 0 ) {
			this.tryUp()
			return
		}
		this.idTimer = setTimeout(() => this.tryUp(), this.options.delay)
	}

	/**
	 * Ferma tutto e non riprova piu' fino al prossimo "start"
	 * @returns 
	 */
	stop() {
		this.try = 0
		if (!this.idTimer) return
		clearTimeout(this.idTimer)
		this.idTimer = null
	}

	/**
	 * Tentativo di riconnessione
	 * @returns 
	 */
	tryUp() {
		this.try++
		if (this.try == this.options.tryMax) {
			log(`socket:recvonnect:try_max`)
			return	
		}
		this.server.connect()
		log(`socket:recvonnect:try:${this.try}`)
	}

}