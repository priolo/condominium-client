import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Search as SearchIcon, Clear as ClearIcon } from '@material-ui/icons';
import { InputBase, fade, IconButton, Box } from '@material-ui/core';


function SearchBox({
	value,
	onChange,
}) {

	const classes = useStyles()

	const haveAdorner = value != null && value.length > 0
	const handleChange = e => onChange(e?.target.value ?? "")

	return (
		<div className={classes.searchBox}>

			<SearchIcon className={classes.searchIcon} />

			<Box ml={2} />

			<InputBase
				placeholder="Search…"
				className={classes.input}
				value={value}
				onChange={handleChange}
				endAdornment={haveAdorner && (
					<IconButton 
						className={classes.clearIcon} 
						onClick={e => handleChange()}
					><ClearIcon /></IconButton>
				)}
			/>

		</div>
	)
}

export default SearchBox

const useStyles = makeStyles((theme) => ({

	searchBox: {
		display: "flex",
		alignItems: "center",
		//width: "100%",
		minHeight: "48px",
		padding: "0px 10px",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
	},

	searchIcon: {
		flex: "0 1 auto",
	},

	clearIcon: {
		color: "inherit",
		padding: "0 5px"
	},

	input: {
		flex: "1 1 auto",
		color: 'inherit',
	},

}));