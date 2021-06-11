/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { useEffect } from 'react';
import { useLayout } from '../../stores/layout';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import Form from '../../components/form/Form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useRoute } from '../../stores/route';
import { useMessage } from '../../stores/message';



function MessageList() {

	// HOOKs
	const { t } = useTranslation()
	const history = useHistory()
	const { state: message, sendTest } = useMessage();
	const { state: route, setCurrentPage } = useRoute()
	const { setTitle } = useLayout()
	const classes = useStyles()

	useEffect(() => {
		setCurrentPage("message.list")
		setTitle(t("pag.message.list.title"))
	}, [])


	//HANDLEs
	const handleClickTest = () => {
		sendTest()
	}


	// RENDER
	return (
		<Form
			renderFooter={
				<Button
					variant="contained"
					color="primary"
					startIcon={<AddIcon />}
					onClick={handleClickTest}
				>
					{t("pag.message.list.test")}
				</Button>
			}
		>
			<Typography>MEssages!!!</Typography>
		</Form>
	)
}

export default MessageList

const useStyles = makeStyles({
	table: {
		//minWidth: 650,
	},
	row: {
		cursor: "pointer",
	},
	container: {
		display: "flex",
		justifyContent: "flex-end",
		marginTop: "14px",
	},
	actionsCell: {
		width: "100px"
	}
});