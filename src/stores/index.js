import { setupStore, MultiStoreProvider } from '@priolo/jon'
import auth from "./auth/store"
import device from "./device/store"
import layout from "./layout/store"
import route from "./route/store"
import user from "./user/store"
import message from "./message/store"
import position from "./position/store"

setupStore({ auth, device, layout, route, user, message, position })

export default MultiStoreProvider