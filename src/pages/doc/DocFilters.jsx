import UserWriterSelector from "../../components/selectors/UserWriterSelector"
import { useRoute } from "../../stores/route"


function DocFilters() {

	const { getSearchUrl, setSearchUrl } = useRoute()

	const handleChange = value => setSearchUrl({ name: "author", value })

	return (
		<UserWriterSelector
			label="Author"
			value={getSearchUrl("author")}
			onChange={handleChange}
		/>
	)
}


export default DocFilters