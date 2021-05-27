/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import React  from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Box, makeStyles, Divider } from '@material-ui/core';
import { useUser } from '../../stores/user';
import { useTranslation } from 'react-i18next';
import RolesSelector from '../../components/selectors/RolesSelector';
import { useValidator, rules } from '@priolo/jon';
import { useHistory } from 'react-router';
import { Link as LinkIcon } from '@material-ui/icons';
import { USER_ROLES } from '../../stores/user/utils';



function EditDialog() {

	// HOOKs
	const { state: user, setEmail, setUsername, setRole, save, canSave, setDialogEditIsOpen } = useUser()
	const { t } = useTranslation();
	const classes = useStyles()
	const history = useHistory()
	const uniqueUserRole = (value) => value != user.selectOrigin?.username && user.all.some(user => user.username == value) ? "not.univoque" : null
	const usernameProps = useValidator(user.select?.username, [rules.obligatory, uniqueUserRole])
	const emailProps = useValidator(user.select?.email, [rules.email])
	const showLinkBook = user.select && user.select.id && user.select.role != USER_ROLES.CUSTOMER


	// HANDLEs
	const handleCloseDialog = e => setDialogEditIsOpen(false)
	const handleChangeEmail = e => setEmail(e.target.value)
	const handleChangeUsername = e => setUsername(e.target.value)
	const handleChangeRole = e => setRole(e.target.value)
	const handleClickSave = e => save()
	const handleClickBook = e => history.push(`/docs?author=${user.select.id}`)


	// RENDER
	if (!user.select) return null

	return (
		<Dialog fullWidth maxWidth="xs"
			open={user.dialogEditIsOpen}
			onClose={handleCloseDialog}
		>
			<DialogTitle classes={{ root: classes.title }}>
				{t(`pag.user.dlg.${user.select.id ? "title_edit" : "title_new"}`)}
			</DialogTitle>

			<Divider />

			<DialogContent classes={{ root: classes.content }}>

				<Grid item sm>
					<TextField autoFocus fullWidth
						{...usernameProps}
						label={t(`pag.user.dlg.username`)}
						margin="dense"
						value={user.select.username}
						onChange={handleChangeUsername}
					/>
				</Grid>
				<Box mt={2} />
				<Grid item sm>
					<TextField autoFocus fullWidth
						{...emailProps}
						label={t(`pag.user.dlg.email`)}
						margin="dense"
						value={user.select.email}
						onChange={handleChangeEmail}
					/>
				</Grid>
				<Box mt={2} />
				<Grid item>
					<RolesSelector label={t(`pag.user.dlg.role`)}
						value={user.select.role}
						onChange={handleChangeRole}
					/>
				</Grid>
				<Box mt={2} />
				<Grid container alignItems="center">
					{showLinkBook && <Button
						endIcon={<LinkIcon />}
						onClick={handleClickBook}
					>{t(`pag.user.dlg.btt_books`)}</Button>}
				</Grid>

			</DialogContent>

			<DialogActions classes={{ root: classes.action }}>
				<Button color="secondary" onClick={handleCloseDialog} >
					{t(`pag.user.dlg.cancel`)}
				</Button>
				<Button color="primary" autoFocus variant="contained"
					onClick={handleClickSave}
					disabled={!canSave()}
				>
					{t(`pag.user.dlg.save`)}
				</Button>
			</DialogActions>

		</Dialog>
	)
}

export default EditDialog

const useStyles = makeStyles(theme => ({
	title: {
		padding: "25px 50px 16px 50px",
	},
	subtitle: {
		color: theme.palette.grey.A700,
	},
	content: {
		paddingLeft: "50px",
		paddingRight: "50px"
	},
	action: {
		padding: "16px 34px 16px 40px",
	},
}))