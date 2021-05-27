import { getStore, useStore } from "@priolo/jon"

export function getStoreDoc() {
	return getStore("doc")
}

export function useDoc() {
	return useStore("doc")
}
