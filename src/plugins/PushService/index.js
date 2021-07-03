import { PushNotifications } from '@capacitor/push-notifications'
import { Capacitor } from '@capacitor/core'


export class PushService {

	constructor() {
		this.token = null
	}

	async init() {
		if (Capacitor.getPlatform() == "web") return

		return new Promise(async (res, rej) => {

			// Request permission to use push notifications
			// iOS will prompt user and return if they granted permission or not
			// Android will just grant without prompting
			const { receive } = await PushNotifications.requestPermissions()
			if (receive == "granted") {
				// Register with Apple / Google to receive push via APNS/FCM
				try {
					PushNotifications.register();
				} catch (error) {
					rej(error)
					return
				}
			} else {
				rej('no prermission')
				return
			}


			// On success, we should be able to receive notifications
			PushNotifications.addListener('registration',
				(token) => {
					console.log('Token: ' + token.value)
					store.setToken(token.value)
					res()
				}
			);

			// Some issue with our setup and push will not work
			PushNotifications.addListener('registrationError', (error) => rej(error))

			// Show us the notification payload if the app is open on our device
			PushNotifications.addListener('pushNotificationReceived',
				(notification) => {
					alert('Push received: ' + JSON.stringify(notification));
				}
			);

			// Method called when tapping on a notification
			PushNotifications.addListener('pushNotificationActionPerformed',
				(notification) => {
					alert('Push action performed: ' + JSON.stringify(notification));
				}
			);
		})
	}

}

const ps = new PushService()
export default ps