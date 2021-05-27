/* eslint eqeqeq: "off" */
import { PushNotifications } from '@capacitor/push-notifications'
import { Capacitor } from '@capacitor/core'



const store = {

	state: {
		token: null,
	},

	getters: {
		isRegistered: (state) => {
			return Capacitor.getPlatform() == "web" || state.token!=null
		},
	},

	actions: {
		init: async (state, _, store) => {
			if ( Capacitor.getPlatform() == "web" ) return

			let resolve, reject
			const promise = new Promise((res, rej)=> {resolve=res; reject=rej})

			// Request permission to use push notifications
			// iOS will prompt user and return if they granted permission or not
			// Android will just grant without prompting
			const { receive } = await PushNotifications.requestPermissions()
			if (receive == "granted") {
				// Register with Apple / Google to receive push via APNS/FCM
				try{
					PushNotifications.register();
				} catch ( error ) {
					reject(error)
					return
				}
			} else {
				reject('no prermission')
				return
			}


			// On success, we should be able to receive notifications
			PushNotifications.addListener('registration',
				(token) => {
					console.log('Token: ' + token.value)
					store.setToken(token.value)
					resolve()
				}
			);

			// Some issue with our setup and push will not work
			PushNotifications.addListener('registrationError', (error) => reject(error) )

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

			return promise
		},
	},
	mutators: {
		setToken: ( state, token) => ({ token }),
	},
}

export default store
