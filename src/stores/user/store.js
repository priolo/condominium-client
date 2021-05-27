/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { getStoreLayout } from "../layout"
import ajax from "../../plugins/AjaxService"
import { ref, validateAll, resetAll } from "@priolo/jon"
import i18n from "i18next";
import { DIALOG_TYPES } from "../layout/utils";
import { USER_ROLES } from "./utils";

import { getStoreRoute } from "../route";



const store = {
	state: {
		all: [],
		dialogEditIsOpen: false,
		select: null,
		selectOrigin: null,
	},
	getters: {
		getList: (state, _, store) => {
			const { getSearchUrl, getSorted } = getStoreRoute()
			let users = [...state.all]

			let txt = getSearchUrl("search").trim().toLowerCase()
			if (txt.length > 0) {
				users = users.filter(user => 
					user.username.toLowerCase().indexOf(txt) != -1
					|| user.email.toLowerCase().indexOf(txt) != -1
				)
			}
			users = getSorted({items: users})
			return users
		},
		canSave: (state, _, store) => {
			const { select: user, selectOrigin: original } = state
			return user && !ref.isEqualDeep(user, original)
		},
		getById: (state, id, store) => {
			return state.all.find( user => user.id == id )
		}
	},
	actions: {
		// get alla USER
		fetchAll: async (state, _, store) => {
			const data = await ajax.get(`users`)
			if ( !data ) return
			store.setAll(data)
			//store.setQueryUrl(document.location.search)
		},

		edit: async (state, user, store) => {
			if (!user) user = {
				username: "",
				email: "",
				role: USER_ROLES.CUSTOMER
			}
			store.setSelect(user)
			resetAll()
			store.setDialogEditIsOpen(true)
		},

		save: async (state, _, store) => {
			const { dialogOpen } = getStoreLayout()
			const { select: user } = state
			if (!user) return false

			// validation
			const errs = validateAll()
			if ( errs.length > 0 ) return false

			// ajax
			if (!user.id) {
				await ajax.post(`users`, user);
			} else {
				await ajax.put(`users/${user.id}`, user);
			}

			// feedback
			store.setDialogEditIsOpen(false)
			store.setSelect(null)
			dialogOpen({ type: DIALOG_TYPES.SUCCESS, text: i18n.t("dialog.feedback.create"), modal: false })

			// update users list
			store.fetchAll()
		},

		destroy: async (state, user, store) => {
			const { dialogOpen } = getStoreLayout()
			if (!user) return

			const res = await dialogOpen({
				type: DIALOG_TYPES.WARNING,
				title: i18n.t("dialog.feedback.delete.confirm.title"),
				text: i18n.t("dialog.feedback.delete.confirm.text"),
				labelOk: i18n.t("dialog.feedback.delete.confirm.yes"),
				labelCancel: i18n.t("dialog.feedback.delete.confirm.no"),
			})
			if (!res) return

			await ajax.delete(`users/${user.id}`);
			dialogOpen({ type: DIALOG_TYPES.SUCCESS, text: i18n.t("dialog.feedback.delete.success"), modal: false })

			store.fetchAll()
		},

	},
	mutators: {
		setAll: (state, all) => ({ all }),
		setDialogEditIsOpen: (state, dialogEditIsOpen) => ({ dialogEditIsOpen }),
		setSelect: (state, selectOrigin) => ({ selectOrigin, select: { ...selectOrigin } }),
		setEmail: (state, email) => ({ select: { ...state.select, email } }),
		setUsername: (state, username) => ({ select: { ...state.select, username } }),
		setRole: (state, role) => ({ select: { ...state.select, role } }),
	},
}


export default store