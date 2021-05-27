import React from 'react'
import { Grid, makeStyles } from "@material-ui/core"
import CentralSpace from '../layouts/CentralSpace'


export default function Form({
	children,
	renderFooter,
	renderMenu,
}) {

	const classes = useStyles()

	return (
		<div className={classes.frame}>

			<CentralSpace
				className={classes.content}
				renderRight={renderMenu && (
					<div className={classes.menu}>
						{renderMenu}
					</div>
				)}
			>
				{children}
			</CentralSpace>

			{renderFooter && (
				<CentralSpace className={classes.footer}>
					<Grid container>{renderFooter}</Grid>
				</CentralSpace>
			)}

		</div>
	)
}


const useStyles = makeStyles(theme => ({
	frame: {
		flex: "1 1 auto", display: "flex", flexDirection: "column",
	},

	content: {
		flex: "1 1 auto",
	},
	// body: {
	// 	marginBottom: "50px",
	// },
	menu: {
		display: "flex", flexDirection: "column",
		position: "sticky", top: "64px",
		padding: "49px 16px 16px 0px", margin: "0 0 0 40px",
	},
	footer: {
		borderTop: "#e0e0e0 1px solid",
		padding: "18px 0",
		display: "flex", flexDirection: "row", alignItems: "center",
		position: "sticky", zIndex: "1", bottom: 0,//`${theme.app.footerbar.height}px`,
		height: "70px",
		backgroundColor: theme.palette.background.default,
	},
}));