/* eslint eqeqeq: "off" */
import ajax from "../../plugins/AjaxService";
import { getStoreDevice } from "../device";
import { getStorePush } from "../push";
import { Storage } from '@capacitor/storage'
import socket from "../../plugins/SocketService"

const store = {
	state: {
		user: null, //{ id:<???>, username:<string>, has_to_change_password:<bool>, role:<???> }
		email: "",
		password: "",
		activationToken: "",
		token: null,
	},
	init: (store) => {
		Storage.get({ key: 'token' }).then( ({value}) => {
			store.setToken(value)
		})
	},
	getters: {
		isLogged: state => state.user != null,
	},
	actions: {

		logInGuest: async (state, _, store) => {
			const { state: device } = getStoreDevice()
			const { state: push } = getStorePush()
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

		fetchMe: async (state, payload, store) => {
			if ( !state.token ) return
			try {
				const response = await ajax.get("user/me")
				store.setUser(response)
				socket.connect(state.token)
			} catch (error) {
				store.logo<ut()
			}
		},

		logout: (state, { flash } = { flash: false }, store) => {
			socket.disconnect()
			store.setToken(null)
			store.setUser(null)
		},

	},
	mutators: {
		// [II] deve essere il layout che pesca lo user e adatta la lista non il contrario
		setUser: (state, user, store) => ({ user }),
		setEmail: (state, email) => ({ email }),
		setPassword: (state, password) => ({ password }),
		setActivationToken: (state, activationToken) => ({ activationToken }),
		setToken: (state, token) => {
			Storage.set({ key: 'token', value: token });
			return { token }
		},
	},
}

export default store