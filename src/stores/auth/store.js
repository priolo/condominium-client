/* eslint eqeqeq: "off" */
import ajax from "../../plugins/AjaxService";
import { getStoreDevice } from "../device";
import push from "../../plugins/PushService"
import { Storage } from '@capacitor/storage'




const store = {

	state: {
		/**
		 * User correntemente loggato  
		 * { id:<???>, username:<string>, has_to_change_password:<bool>, role:<???> }
		 */
		user: null,
		/** token della sessione jwt */
		token: null,

		email: "",
		password: "",
		activationToken: "",
	},

	/** init dello STORE */
	init: (store) => {
		// se è stato memorizzato ricavo il precedente TOKEN
		Storage.get({ key: 'token' }).then(({ value }) => {
			store.setToken(value)
		})
	},

	getters: {
		isLogged: state => state.user != null,
	},

	actions: {

		/**
		 * Cerca di connettersi in anonimo
		 */
		logInGuest: async (state, _, store) => {
			const { state: device } = getStoreDevice()
			const data = {
				browserId: device.browserId,
				deviceInfo: device.deviceInfo,
				pushToken: push.token,
			}
			try {
				const { token } = await ajax.post("auth/login/guest", data)
				store.setToken(token)
				await store.fetchMe()
			} catch (error) {
				//dialogOpen({ type: "error", text: "no no no!!!", modal: false })
				return
			}
		},

		/**
		 * Prelevo i dati del mio account. 
		 * Questo funziona se sei loggato!
		 */
		fetchMe: async (state, payload, store) => {
			if (!state.token) return
			try {
				const response = await ajax.get("user/me")
				store.setUser(response)
			} catch (error) {
				store.logout()
			}
		},

		/**
		 * Chiudo la sessione
		 */
		logout: (state, { flash } = { flash: false }, store) => {
			store.setToken(null)
			store.setUser(null)
		},

	},

	mutators: {
		setUser: (state, user, store) => ({ user }),
		setToken: (state, token) => {
			if (!token || token.length == 0) {
				Storage.remove({ key: "token" })
			} else {
				Storage.set({ key: 'token', value: token });
			}
			return { token }
		},


		setEmail: (state, email) => ({ email }),
		setPassword: (state, password) => ({ password }),
		setActivationToken: (state, activationToken) => ({ activationToken }),
	},

}

export default store