import { makeStyles } from '@material-ui/core'
import { useLayout } from '../../stores/layout';


export default function CentralSpace({
	renderLeft,
	renderRight,
	children,
	className,
	isCentered = false,
}) {

	const classes = useStyles()
	const { state:layout } = useLayout();

	const cnContainer = `${classes.container} ${className ?? ""} ${isCentered ? "centered" : ""}`
	const cnLateral = `${classes.lateral} ${layout.device}`
	const cnCentral = `${classes.central} ${layout.device}`

	return (
		<div className={cnContainer}>

			<div className={cnLateral}>
				{renderLeft}
			</div>

			<div className={cnCentral}>
				{children}
			</div>

			<div className={cnLateral}>
				{renderRight}
			</div>

		</div>
	)
}

const useStyles = makeStyles(theme => ({

	container: {
		display: "flex",
		width: "100%",
		"&.centered": {
			alignItems: "center"
		}
	},

	// lateral space
	lateral: {
		display: "flex", flex: "1 1 0%",
		"&.mobile": {
			display: "flex", flex: "0 1 5px",
		},
		"&.pad": {
			display: "flex", flex: "0 1 10%",
		}
	},

	// central space
	central: {
		flex: "3 1 0%",
		minWidth: "300px", 
		maxWidth: "700px",
		"&.mobile": {
			maxWidth: "unset",
		},
		"&.pad": {
			maxWidth: "unset",
		}
	},

}))
