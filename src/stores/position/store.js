/* eslint eqeqeq: "off" */
import position from "../../plugins/PositionService"


const store = {

	state: {
		haveAccuracy: false,
	},

	getters: {
	},

	actions: {

		/** connessione via WS al server */
		connect: async (state, _, store) => {
		},

		/** disconnette il WS al server */
		disconnect: async (state, _, store) => {
		},

	},

	mutators: {
		setHaveAccuracy: (state, haveAccuracy) => ({ haveAccuracy }),
	},
}

export default store

