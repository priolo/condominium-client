/* eslint eqeqeq: "off" */
import ajax from "../../plugins/AjaxService"
import { getStoreRoute } from "../route"
import { ref, validateAll } from "@priolo/jon"
import { getStoreLayout } from "../layout"
import { DIALOG_TYPES } from "../layout/utils"
import i18n from "i18next";


const store = {
	state: {
		all: [],
		select: null,
		selectOrigin: null,
	},
	getters: {
		getList: (state, _, store) => {
			const { getSearchUrl, getSorted } = getStoreRoute()
			let docs = [...state.all]

			let txt = getSearchUrl("search").trim().toLowerCase()
			let authorId = getSearchUrl("author")
			if (txt.length > 0 || authorId ) {
				docs = docs.filter(doc => 
					(!txt || doc.title.toLowerCase().indexOf(txt) != -1)
					&&
					(!authorId || doc.author_id==authorId)
				)
			}

			docs = getSorted({items: docs})
			return docs
		},
		canSave: (state, _, store) => {
			const { select: doc, selectOrigin: original } = state
			return doc && !ref.isEqualDeep(doc, original)
		},
		isSelectChanged: (state, _, store) => {
			const { select: doc, selectOrigin: original } = state
			return doc && !ref.isEqualDeep(doc, original)
		},
	},
	actions: {
		// get alla DOCs
		fetchAll: async (state, _, store) => {
			const data = await ajax.get(`docs`)
			if ( !data ) return
			store.setAll(data)
		},
		fetchById: async (state, id, store) => {
			const data = await ajax.get(`docs/${id}`);
			store.setSelect(data)
			return data
		},
		edit: async (state, doc, store) => {
			if (!doc) doc = {
				title: "",
				desc: "",
				link: "",
				author_id: null,
			}
			store.setSelect(doc)
		},
		save: async (state, _, store) => {
			const { dialogOpen } = getStoreLayout()
			const { select: doc } = state
			if (!doc) return false

			// validation
			const errs = validateAll()
			if ( errs.length > 0 ) return false

			if (!doc.id) {
				await ajax.post(`docs`, doc);
			} else {
				await ajax.put(`docs/${doc.id}`, doc);
			}

			store.setSelect(null)
			dialogOpen({ type: DIALOG_TYPES.SUCCESS, text: i18n.t("dialog.feedback.create"), modal: false })
			//window.history.back()
			return true
		},

		destroy: async (state, doc, store) => {
			const { dialogOpen } = getStoreLayout()
			if (!doc) return

			const res = await dialogOpen({
				type: DIALOG_TYPES.WARNING,
				title: i18n.t("dialog.feedback.delete.confirm.title"),
				text: i18n.t("dialog.feedback.delete.confirm.text"),
				labelOk: i18n.t("dialog.feedback.delete.confirm.yes"),
				labelCancel: i18n.t("dialog.feedback.delete.confirm.no"),
			})
			if (!res) return

			await ajax.delete(`docs/${doc.id}`);
			dialogOpen({ type: DIALOG_TYPES.SUCCESS, text: i18n.t("dialog.feedback.delete.success"), modal: false })

			store.fetchAll()
		},

	},
	mutators: {
		setAll: (state, all) => ({ all }),
		setSelect: (state, selectOrigin) => ({ selectOrigin, select: selectOrigin ? { ...selectOrigin }: null }),
		setSelectProp: (state, {name, value}) => ({ select: {...state.select, [name]: value} }),
	},
}

export default store