/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { makeStyles } from "@material-ui/core/styles"
import { Divider, Drawer, IconButton, List, SwipeableDrawer } from "@material-ui/core"
import { ChevronLeft as ChevronLeftIcon } from "@material-ui/icons"
import ItemMenu from "./ItemMenu"

import { useLayout } from "../../stores/layout"


function MainDrawer () {

	const { state: layout, toggleDrawerIsOpen, getDrawerList, setDrawerIsOpen } = useLayout()
	const classes = useStyles()


	const variant = layout.device == "desktop" ? "persistent" : null


	return (
		<Drawer
			variant={variant}
			className={classes.drawer}
			open={layout.drawerIsOpen}
			classes={{ paper: classes.drawerPaper }}
			anchor="left"
			ModalProps={{ onBackdropClick: toggleDrawerIsOpen }}
			onClose={()=>setDrawerIsOpen(false)}
			onOpen={()=>setDrawerIsOpen(true)}

		>
			<div className={classes.drawerHeader}>
				<IconButton onClick={toggleDrawerIsOpen}>
					<ChevronLeftIcon />
				</IconButton>
			</div>
			<Divider />
			<List>
				{getDrawerList().map(item => (
					<ItemMenu value={item} key={item.label} />
				))}
			</List>
		</Drawer>
	)
}

export default MainDrawer

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: theme.app.drawer.width,
		flexShrink: 0
	},
	drawerPaper: {
		width: theme.app.drawer.width
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end"
	}
}))
