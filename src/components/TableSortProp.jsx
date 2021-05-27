/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { TableSortLabel } from '@material-ui/core';
import React from 'react';
import { useRoute } from '../stores/route';



function TableSortProp ({
	children,
	name,
}) {

	const { getSearchUrl, setSort } = useRoute()
	const active = getSearchUrl("sortName") == name
	const direction = getSearchUrl("isAsc")== "true" ? "asc" : "desc"

	const handleClickSort = e => setSort(name)

	return (
		<TableSortLabel
			active={active}
			direction={direction}
			onClick={handleClickSort}
		>{children}
		</TableSortLabel>
	)
}

export default TableSortProp