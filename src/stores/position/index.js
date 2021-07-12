import { getStore, useStore } from '@priolo/jon'

export function getStorePosition() {
	return getStore("position")
}

export function usePosition() {
	return useStore("position")
}



