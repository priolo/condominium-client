/* eslint eqeqeq: "off" */
import socket from "../../plugins/SocketService"
import position from "../../plugins/PositionService"

import { getStoreAuth } from "../auth";


const store = {

	state: {
		text: "",
		messages: [],
		haveAccuracy: false,
	},

	getters: {
	},

	actions: {

		/** connessione via WS al server */
		connect: async (state, _, store) => {
			const { state: auth } = getStoreAuth()
			if (!auth.token) return
			await socket.connect(auth.token)
			await position.start()
		},

		/** disconnette il WS al server */
		disconnect: async (state, _, store) => {
			socket.disconnect()
			position.stop()
		},

		/** invia un nuovo messaggio al server */
		sendTextMessage: (state, _, store) => {
			socket.send({
				path: "com", action: "message",
				payload: state.text,
			})
		},

		/** chiedo al server la lista dei messaggi locali */
		sendRefreshMessages: async (state, _, store) => {
			const messages = await socket.sendAndWait("messages")
			store.setMessages(messages)
		}

	},

	mutators: {
		setHaveAccuracy: (state, haveAccuracy) => ({ haveAccuracy }),
		setText: (state, text) => ({ text }),
		setMessages: (state, messages) => ({ messages }),
	},

	watch: {
		"auth": {
			"setUser": (store, value) => {
				if (value) {
					store.connect()
				} else {
					store.disconnect()
				}
			}
		}
	}
}

export default store

