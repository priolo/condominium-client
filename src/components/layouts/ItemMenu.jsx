import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useHistory, useRouteMatch } from "react-router-dom";



function ItemMenu({
	value,
}) {

	const classes = useStyles()
	const history = useHistory()
	const match = useRouteMatch(value.route)
	
	const handleClick = item => history.push(item.route)

	const cnItem = match ? classes.selected : ""
	const cnIcon = match ? classes.selectedIcon : ""


	return (
		<ListItem button
			onClick={() => handleClick(value)} 
			className={cnItem}
		>
			<ListItemIcon>
				<value.icon className={cnIcon} />
			</ListItemIcon>
			<ListItemText primary={value.label} />
		</ListItem>
	)
}

export default ItemMenu

const useStyles = makeStyles((theme) =>
	createStyles({
		selected: {
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.primary.contrastText,
			"&:hover": {
				backgroundColor: theme.palette.primary.light,
			},
		},
		selectedIcon: {
			color: theme.palette.primary.contrastText,
		},
	}),
);