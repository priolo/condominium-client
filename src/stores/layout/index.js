import { getStore, useStore } from "@priolo/jon"

export function getStoreLayout() {
	return getStore("layout")
}

export function useLayout() {
	return useStore("layout")
}
