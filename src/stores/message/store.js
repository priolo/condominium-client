/* eslint eqeqeq: "off" */
import socket from "../../plugins/SocketService"
import { Geolocation } from '@capacitor/geolocation';
import { getStoreAuth } from "../auth";


const store = {

	state: {
		geowatchId: "",
	},

	getters: {
	},

	actions: {

		connect: async (state, _, store) => {
			const { state:auth } = getStoreAuth()
			if ( !auth.token ) return
			await socket.connect(auth.token)
			debugger
			const id = await Geolocation.watchPosition(null, (position, err) => {
				socket.send({
					path: "geo",
					payload: position
				})
			})
			store.setGeowatchId(id)
		},

		disconnect: async (state, _, store) => {
			socket.disconnect()
			await Geolocation.clearWatch({ id: state.geowatchId})
			store.setGeowatchId(null)
		},

		sendTest: async (state, _, store) => {
			socket.send({
				path: "debug",
				payload: "test"
			})
		}

	},

	mutators: {
		setGeowatchId: ( state, geowatchId ) => ({geowatchId})
	},

	watch: {
		"auth": {
			"setUser": (store, value)=> {
				if ( value ) {
					store.connect()
				} else {
					store.disconnect()
				}
			}
		}
	}
}

export default store

