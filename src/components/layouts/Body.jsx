/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { makeStyles } from "@material-ui/core/styles"
import { useLayout } from "../../stores/layout";


function Body({
	children
}) {

	const classes = useStyles()
	const { state: layout } = useLayout()


	const cnContent = `${classes.content} ${layout.drawerIsOpen && layout.device == "desktop" ? classes.contentShift : ""}`


	return (
		<main className={cnContent}>
			<div className={classes.drawerHeader} />
			{children}
		</main>
	)
}

export default Body

const useStyles = makeStyles((theme) => ({
	content: {
		display: "flex", flexDirection: "column",
		height: "100%",
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: 0
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: theme.app.drawer.width,
	},
	drawerHeader: {
		// necessary for content to be below app bar
		flex: `0 1 ${theme.app.header}`,
		...theme.mixins.toolbar
	}
}))
