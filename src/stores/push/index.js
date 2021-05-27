import { getStore, useStore } from '@priolo/jon'


export function getStorePush() {
	return getStore("push")
}

export function usePush() {
	return useStore("push")
}