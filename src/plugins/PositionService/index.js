import { Geolocation } from '@capacitor/geolocation';
import { getStoreMessage } from '../../stores/message';
import socket from '../SocketService';
import { GeoPosition } from "@priolo/jon-utils"



export class PositionService {

	constructor() {
		this.id = null
		this.oldPosition = null
		this.position = null
	}

	/** inizia a mandare la posizione al server via WS */
	async start() {
		const id = await Geolocation.watchPosition(
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 0,
			}, 
			(position, err) => {
				this.setNewPosition(position)
			}
		)
		this.id = id
	}

	/** termina l'invio della posizione al server via WS */
	async stop() {
		await Geolocation.clearWatch({ id: this.id })
		this.id = null
	}


	haveAccuracy () {
		const have = this.position.accuracy < 4
		const { setHaveAccuracy } = getStoreMessage()
		setHaveAccuracy(have)
		return have
	}

	haveDistance () {
		const dist = GeoPosition.distance ( this.position.latitude, this.position.longitude, this.oldPosition.latitude, this.oldPosition.longitude )
		return dist > 4
	}

	haveTime () {
		const deltaTime = this.position.timestamp - this.oldPosition.timestamp
		return deltaTime > 4
	}


	/** setta una nuova posizione ed eventualmente la manda al server */
	setNewPosition ( newPosition ) {
		this.oldPosition = this.position		
		this.position = newPosition
		if ( !this.haveAccuracy() || !this.haveTime() || !this.haveDistance() ) return
		this.sendPosition()
	}


	/** Invia la posizione corrente al server */
	sendPosition() {
		socket.send({
			path: "com", action: "position",
			payload: this.position,
		})
	}

}

const ps = new PositionService()
export default ps