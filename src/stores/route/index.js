import { getStore, useStore } from "@priolo/jon"



export function getStoreRoute() {
	return getStore("route")
}

export function useRoute() {
	return useStore("route")
}
