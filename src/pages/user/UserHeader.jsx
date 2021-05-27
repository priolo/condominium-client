import SearchBox from "../../components/SearchBox"
import { useRoute } from "../../stores/route"


function UserHeader() {

	const { getSearchUrl, setSearchUrl } = useRoute()

	return (
		<SearchBox
			value={getSearchUrl("search")}
			onChange={value => setSearchUrl({ name: "search", value })}
		/>
	)
}


export default UserHeader