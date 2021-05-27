import { getStore, useStore } from '@priolo/jon'

export function getStoreAuth() {
	return getStore("auth")
}

export function useAuth() {
	return useStore("auth")
}
