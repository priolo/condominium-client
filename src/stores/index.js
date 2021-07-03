import { setupStore, MultiStoreProvider } from '@priolo/jon'
import auth from "./auth/store"
import device from "./device/store"
import doc from "./doc/store"
import layout from "./layout/store"
import route from "./route/store"
import user from "./user/store"
import message from "./message/store"

setupStore({ auth, device, doc, layout, route, user, message })

export default MultiStoreProvider