import { Geolocation } from '@capacitor/geolocation';
import { GeoPosition } from "@priolo/jon-utils"

import { getStorePosition } from '../../stores/position';



class PositionService {

	constructor() {
		this.id = null
		this.oldPosition = null
		this.position = null
	}

	/** inizia a monitorare la posizione */
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

	/** finisce di monitorare la posizione */
	async stop() {
		await Geolocation.clearWatch({ id: this.id })
		this.id = null
	}


	haveAccuracy () {
		const { setHaveAccuracy } = getStorePosition()
		const have = this.position.accuracy < 4
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

}

export default PositionService
