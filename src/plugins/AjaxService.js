/* eslint eqeqeq: "off" */
import { getStoreLayout } from "../stores/layout"
import i18n from "i18next"
import { DIALOG_TYPES } from "../stores/layout/utils"
import { getStoreAuth } from "../stores/auth"
import { Capacitor } from '@capacitor/core'



const host = Capacitor.getPlatform() == "web" ? "localhost" : "192.168.8.103"
const optionsDefault = {
	baseUrl: `http://${host}:5001/api/`
}

export class AjaxService {
	constructor(options = optionsDefault) {
		this.options = { ...optionsDefault, ...options }
	}

	async post(url, data, options) {
		return await this.send(url, "POST", data, options)
	}
	async get(url, data, options) {
		return await this.send(url, "GET", data, options)
	}
	async patch(url, data, options) {
		return await this.send(url, "PATCH", data, options)
	}
	async put(url, data, options) {
		return await this.send(url, "PUT", data, options)
	}
	async delete(url, data, options) {
		return await this.send(url, "DELETE", data, options)
	}

	/**
	 * Send a ajax to server
	 * @param {*} url 
	 * @param {*} method 
	 * @param {*} data 
	 * @param {*} options
	 * @param {boolean} options.noBusy (true) no show busy indictor
	 */
	async send(url, method, data, options = {}) {
		const { setBusy, dialogOpen, setFocus } = getStoreLayout()
		const { state:auth } = getStoreAuth()

		if (!options.noBusy) setBusy(true)

		const headers = { "Content-Type": "application/json" }
		if ( auth.token ) headers["Authorization"] = `Bearer ${auth.token}`

		// send request
		const response = await fetch(
			`${this.options.baseUrl}${url}`,
			{
				method,
				headers,
				body: data ? JSON.stringify(data) : undefined,
			}
		)
		if (!options.noBusy) setBusy(false)

		//setFocus("")
		const status = response.status
		let body = null
		try {
			body = await response.json()
		} catch (e) {}

		// error
		if (status >= 400) {
			const error = body && body.errors && body.errors[0] ? body.errors[0] : { code: "default", field: "" }
			dialogOpen({
				type: DIALOG_TYPES.ERROR,
				title: i18n.t(getI18nPathForError(status, url, error.code, "title")),
				text: i18n.t(getI18nPathForError(status, url, error.code, "text")),
				labelOk: i18n.t(getI18nPathForError(status, url, error.code, "ok")),
			})
			setFocus(error.field)
			throw response;
		}
		
		return body
	}
}

/**
 * find correct text in i18n json 
 * @param {*} status 
 * @param {*} url 
 * @param {*} code 
 * @param {*} prop 
 */
function getI18nPathForError(status, url, code, prop) {
	let i
	const context = url.slice(0, (i = url.indexOf("/")) != -1 ? i : undefined)
	return [
		`dialog.error.${context}.${code}.${prop}`,
		`dialog.error.${context}.default.${prop}`,
		`dialog.error.${status}.${code}.${prop}`,
		`dialog.error.${status}.default.${prop}`,
		`dialog.error.default.${prop}`
	]
}



export default new AjaxService()