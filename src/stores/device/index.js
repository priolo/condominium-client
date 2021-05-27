import { getStore, useStore } from '@priolo/jon'

export function getStoreDevice() {
	return getStore("device")
}

export function useDevice() {
	return useStore("device")
}



