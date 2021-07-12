/* eslint eqeqeq: "off" */
import {socketService, socketCommandService, ACTIONS_FROM_CLIENT} from "../../plugins/SocketService"
import { getStoreAuth } from "../auth";


const store = {

	state: {
		text: "",
		messages: [],
	},

	getters: {
	},

	actions: {

		/** connessione via WS al server */
		connect: async (state, _, store) => {
			const { state: auth } = getStoreAuth()
			if (!auth.token) return
			await socketService.connect(auth.token)
		},

		/** disconnette il WS al server */
		disconnect: async (state, _, store) => {
			socketService.disconnect()
		},

		/** invia un nuovo messaggio al server */
		sendTextMessage: (state, _, store) => {
			socketCommandService.textMessage(state.text)
		},

		/** chiedo al server la lista dei messaggi locali */
		sendRefreshMessages: async (state, _, store) => {
			socketCommandService.getNearMessages()
			const messages = await socketService.wait(ACTIONS_FROM_CLIENT.MESSAGES)
			store.setMessages(messages)
		}

	},

	mutators: {
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

