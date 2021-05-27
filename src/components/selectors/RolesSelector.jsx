import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import React from 'react';
import { useTranslation } from 'react-i18next';
import { USER_ROLES } from "../../stores/user/utils"



function RolesSelector({
	label,
	value,
	onChange,
	disabled,
}) {

	const { t } = useTranslation();
	
	return (
		<FormControl>
			<InputLabel id="demo-simple-select-label">{label}</InputLabel>
			<Select autoWidth
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={value}
				onChange={onChange}
				disabled={disabled}
			>
				{Object.values(USER_ROLES).map( (role) => (
					<MenuItem key={role} value={role}>
						{t(`app.roles.${role}`)}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default RolesSelector
