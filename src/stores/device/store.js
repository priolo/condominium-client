/* eslint eqeqeq: "off" */
import { Device } from '@capacitor/device'
import push from "../../plugins/PushService"
import { Capacitor } from '@capacitor/core'


const store = {

	state: {
		browserId: null,
		deviceInfo: null,
	},

	getters: {
		isInitialized: (state, _, store) => {
			return Capacitor.getPlatform() == "web" || push.token!=null
		}
	},

	actions: {
		init: async (state, _, store) => {
			const browserId = await getBrowserId()
			store.setBrowserId(browserId)
			const info = await Device.getInfo();
			store.setDeviceInfo(info);
			await push.init()
		},
	},

	mutators: {
		setBrowserId: (state, browserId) => ({ browserId }),
		setDeviceInfo: (state, deviceInfo) => ({ deviceInfo }),
	},
}

export default store

/** cerca di determinare un id del browser in uso (non so se funziona veramente) */
async function getBrowserId() {
	if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return null
	const devices = await navigator.mediaDevices.enumerateDevices()
	return devices.find(device => device.deviceId.length > 30)?.deviceId
}