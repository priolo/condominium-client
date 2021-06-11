/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { themeLight, themeDark } from "../../theme"
import { People, Description } from '@material-ui/icons';
import Cookies from "js-cookie";
import { DIALOG_TYPES } from "./utils";
import i18n from "i18next";



// used when dialog closed
let resolveClose = null;

const store =  {
	state: {
		busy: false,
		title: "",
		focus: "",
		drawerIsOpen: true,
		drawerRightIsOpen: false,

		theme: Cookies.get('theme') == "dark" ? themeDark : themeLight,

		menu: [
			{ label: "Message", icon: People, route: "/message" },
		],

		dialogIsOpen: false,
		dialogOptions: null,

		device: null,
	},
	init: (store) => {
		const checkDevice = ()=> {
			const deviceName = window.innerWidth < 767 ? "mobile" 
				: window.innerWidth < 950 ? "pad"
				: "desktop"
			store.setDevice(deviceName)
		}
		window.addEventListener("resize", (e) => checkDevice());
		checkDevice()
	},
	getters: {
		getDrawerList: (state, _, store) => {
			return state.menu
		},
		isDarkTheme: (state, _, store) => state.theme == themeDark,
	},
	actions: {
		dialogOpen: (state, options, store) => {
			store.setDialogOpen(options)
			return new Promise((resolve, reject) => {
				resolveClose = resolve
			})
		},
		dialogClose: (state, payload, store) => {
			store.setDialogClose()
			if (resolveClose) resolveClose(payload)
			resolveClose = null
			//store._update()
		}
	},
	mutators: {
		setBusy: (state, busy) => ({ busy }),
		setTitle: (state, title) => ({ title }),
		setFocus: (state, focus) => ({ focus }),

		setDrawerIsOpen: (state, drawerIsOpen) => ({ drawerIsOpen }),
		toggleDrawerIsOpen: (state) => ({ drawerIsOpen: !state.drawerIsOpen }),

		setDrawerRightIsOpen: (state, drawerRightIsOpen) => ({ drawerRightIsOpen }),

		toggleTheme: (state) => {
			Cookies.set("theme", state.theme == themeLight ? "dark" : "light")
			return {
				theme: state.theme == themeLight ? themeDark : themeLight
			}
		},

		setDialogOpen: (state, options) => {
			options = { ...optionsDefault, ...options }
			if (options.type && options.modal) {
				const path = `dialog.${options.type}.default`
				options = {
					title: i18n.t(`${path}.title`),
					text: i18n.t(`${path}.text`),
					labelOk: i18n.t(`${path}.ok`),
					...options
				}
			}
			return {
				dialogOptions: options,
				dialogIsOpen: true
			}
		},
		setDialogClose: (state, _) => ({ dialogIsOpen: false }),

		setDevice: ( state, device ) => ({ device }),
	},
}

export default store

const optionsDefault = {
	modal: true,
	type: DIALOG_TYPES.INFO,
}
