import { recorder, RECORDER_STATE, player } from '@priolo/jon';
import { clipboard } from "@priolo/jon-utils"
import { useState } from 'react';
import styles from './debugButton.module.css';
//import ajax from "../../../plugins/AjaxService";


const shots = [
	"login",
	"login2",
	"login3",
	"login4",
]

const options = {
	exclude: [
		"layout",
		"doc.all.id",
		"doc.all.date",
		"menu.all.id",
		"url",
		"auth.token",
		"auth.activationToken",
		"auth.user.id",
		"auth.user.iat",
		"auth.user.exp",
		"node"
	],
}

function DebugButton({
}) {

	// HOOKs
	const [msg, setMsg] = useState("stop")
	const [shotSel, setShotSel] = useState("")

	// HANDLEs

	// recorder
	const handleClickRecStart = e => {
		recorder.start(options)
		setMsg("rec : start")
	}
	const handleClickRecCheck = e => {
		recorder.checkHash()
		setMsg("rec : check!")
	}
	const handleClickRecStop = e => {
		const states = recorder.stop()
		clipboard.set(JSON.stringify(states))
		setMsg("rec : stop : clipboard")
	}

	// player
	const handleChangeShot = async e => {
		const shot = e.target.value
		setShotSel(shot)
		if ( shot == "" ) return
		const module = await import(`./shots/${shot}.json`)
		// reset server
		//await ajax.post("debug/reset")
		const log = await player.all(module.default)
		console.log(log)
	}




	// // state load/save
	// const handleClickSave = e => {
	// 	const states = getAllStates()
	// 	clipboardSet(JSON.stringify(states))
	// 	setMsg("state >>> clipboard")
	// }
	// const handleClickLoad = async e => {
	// 	const statesStr = await clipboardGet()
	// 	const states = JSON.parse(statesStr)
	// 	setAllState(states)
	// 	setMsg("clipboard >>> state")
	// }


	// RENDER
	const state = recorder.getState()

	return (
		<div className={styles.root} >

			<div className={styles.buttons}>

				{state == RECORDER_STATE.STOP &&
					<button className={styles.btt} onClick={handleClickRecStart}>rec</button>
				}

				{state == RECORDER_STATE.PLAY && (<>
					<button className={styles.btt} onClick={handleClickRecCheck}>check</button>
					<button className={styles.btt} onClick={handleClickRecStop}>stop</button>
				</>)}

				{state == RECORDER_STATE.STOP && (<>
					<div className={styles.space} />

					<select onChange={handleChangeShot} value={shotSel}>
						<option key="default" default value="">select shot</option>
						{shots.map((shot, index) => (
							<option key={index} value={shot}>{shot}</option>
						))}
					</select>

					{/* 
					<div className={styles.space} />

					<button className={styles.btt} onClick={handleClickSave}>save</button>
					<button className={styles.btt} onClick={handleClickLoad}>load</button> 
					*/}
				</>)}
			</div>

			<div className={styles.msg}>{msg}</div>
		</div>
	)
}

export default DebugButton

