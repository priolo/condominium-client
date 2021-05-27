/* eslint react-hooks/exhaustive-deps: "off" */
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLayout } from "../stores/layout";
import i18n from "i18next"

/**
 * Se c'e' una "modifica" chiede all'utente se davvero vuole cambiare pagina 
 * @param {*} callbackChanged per capire se, nella pagina, è cambiato qualcosa
*/
export function useConfirmationRouter( callbackChanged) {

	const history = useHistory()
	const { dialogOpen } = useLayout()

	useEffect(() => {
		let unblock = history.block((location)=>{
			if ( location.hash?.length>0 ) return true
			if ( callbackChanged() ) {
				(async ()=>{
					if ( await dialogOpen({
						type: "warning",
						title: i18n.t("pag.default.dlg.router_confirm.title"),
						text: i18n.t("pag.default.dlg.router_confirm.text"),
						labelOk: i18n.t("pag.default.dlg.router_confirm.labelOk"),
						labelCancel: i18n.t("pag.default.dlg.router_confirm.labelCancel"),
					})) {
						unblock()
						history.push(location)
					}
				})()
				return false
			}
			unblock()
			return true
		});
		return unblock
	}, [])
	
}