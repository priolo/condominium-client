/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/


const store = {
	state: {
		currentPage: "",
		queryUrl: "",
	},
	getters: {

		getSearchUrl: (state, name, store) => {
			const searchParams = new URLSearchParams(window.location.search)
			return (searchParams.get(name) ?? "")
		},
		getSorted: (state, { items, map }, store) => {
			const sortName = store.getSearchUrl("sortName")
			const isAsc = store.getSearchUrl("isAsc") == "true"
			const extractor = map?.[sortName]
			if (!extractor) {
				return items.sort(
					(a, b) => (a[sortName] < b[sortName] ? -1 : 1) * (isAsc ? 1 : -1)
				)
			}
			return items.sort(
				(a, b) => extractor(a, b) * (isAsc ? 1 : -1)
			)
		},
		haveSearchExtra: (state, name, store) => {
			const searchParams = new URLSearchParams(window.location.search)
			const keys = [...searchParams.keys()]
			return keys.filter(key => Object.values(URL_PARAMS_COMMON).indexOf(key) == -1).length > 0
		}
	},
	actions: {
	},
	mutators: {
		setSearchUrl: (state, { name, value }) => {
			const queryParams = new URLSearchParams(window.location.search)
			if (value && value.toString().length > 0) {
				queryParams.set(name, value)
			} else {
				queryParams.delete(name)
			}
			window.history.replaceState(null, null, "?" + queryParams.toString())
			return { queryUrl: queryParams.toString() }
		},
		setCurrentPage: (state, currentPage) => ({ currentPage }),
		setSort: (state, sortName, store) => {
			const oldSortName = store.getSearchUrl("sortName")
			const oldIsAsc = store.getSearchUrl("isAsc") == "true"
			let sortIsAsc = oldSortName == sortName ? !oldIsAsc : oldIsAsc
			store.setSearchUrl({ name: "sortName", value: sortName })
			store.setSearchUrl({ name: "isAsc", value: sortIsAsc })
		},
	},
}

export default store

export const URL_PARAMS_COMMON = {
	SORT_NAME: "sortName",
	SORT_ASC: "isAsc",
	SEARCH: "search",
}