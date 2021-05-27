/* eslint eqeqeq: "off" */
import { Device } from '@capacitor/device'


const store = {

	state: {
		browserId: null,
		deviceInfo: null,
	},

	getters: {
	},

	actions: {

		init: async (state, _, store) => {
			const browserId = await getBrowserId()
			store.setBrowserId(browserId)
			const info = await Device.getInfo();
			store.setDeviceInfo(info);
		},

	},

	mutators: {
		setBrowserId: (state, browserId) => ({ browserId }),
		setDeviceInfo: (state, deviceInfo) => ({ deviceInfo }),
	},
}

export default store

async function getBrowserId() {
	if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return null
	const devices = await navigator.mediaDevices.enumerateDevices()
	return devices.find(device => device.deviceId.length > 30)?.deviceId
}