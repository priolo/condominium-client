import { Badge, Grid, IconButton } from "@material-ui/core"
import SearchBox from "../../components/SearchBox"
import { FilterList as FiltersIcon } from '@material-ui/icons'
import { useLayout } from "../../stores/layout"
import { useRoute } from "../../stores/route"


function DocHeader() {

	const { state: layout, setDrawerRightIsOpen } = useLayout()
	const { getSearchUrl, setSearchUrl } = useRoute()

	const notHaveFilter = !getSearchUrl("author")

	const handleClickFilter = e => setDrawerRightIsOpen(!layout.drawerRightIsOpen)

	return (<Grid container wrap="nowrap">
		<SearchBox
			value={getSearchUrl("search")}
			onChange={value => setSearchUrl({ name: "search", value })}
		/>
		<Badge color="error" variant="dot" invisible={notHaveFilter} overlap="circle">
			<IconButton color="inherit" onClick={handleClickFilter}>
				<FiltersIcon />
			</IconButton>
		</Badge>
	</Grid>)
}


export default DocHeader