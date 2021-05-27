import { getStore, useStore } from '@priolo/jon'

export function getStoreMessage() {
	return getStore("message")
}

export function useMessage() {
	return useStore("message")
}



