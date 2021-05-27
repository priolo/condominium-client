/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import { Box, Button, TextField } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { rules, useValidator } from "@priolo/jon";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router";
import Form from "../../components/form/Form";
import FormParagraph from "../../components/form/FormParagraph";
import FormRow from "../../components/form/FormRow";
import UserWriterSelector from "../../components/selectors/UserWriterSelector";
import { useConfirmationRouter } from "../../hooks/useConfirmationRouter";

import { useDoc } from "../../stores/doc";
import { useLayout } from "../../stores/layout";
import { useRoute } from "../../stores/route";



function DocDetail() {

	// HOOKS
	const { id } = useParams()
	const { t } = useTranslation()
	const history = useHistory()
	
	const { state: doc, fetchById, edit, setSelectProp, canSave, isSelectChanged, save } = useDoc()
	const { setCurrentPage } = useRoute()
	const { setTitle } = useLayout()
	const titleProp = useValidator(doc.select?.title, [rules.obligatory])
	const linkProp = useValidator(doc.select?.link, [rules.url])

	useEffect(() => {
		setCurrentPage("doc.detail")
		if (!id) return
		if (id == "new") {
			setTitle(t("pag.doc.detail.title_new"))
			edit()
		} else {
			setTitle(t("pag.doc.detail.title_edit"))
			fetchById(id).then((doc) => edit(doc))
		}
	}, [id])

	useConfirmationRouter(isSelectChanged)



	// HANDLERS
	const handleChangeTitle = e => setSelectProp({ name: "title", value: e.target.value })
	const handleChangeDesc = e => setSelectProp({ name: "desc", value: e.target.value })
	const handleChangeLink = e => setSelectProp({ name: "link", value: e.target.value })
	const handleChangeAuthor = value => setSelectProp({ name: "author_id", value })
	const handleClickCancel = e => history.goBack()
	const handleClickSave = e => save().then((success) => {
		if (success) history.goBack()
	})



	// RENDER
	if (!doc.select) return null

	return (
		<Form
			renderFooter={<>
				<Button variant="contained"
					color="primary"
					startIcon={<AddIcon />}
					disabled={!canSave()}
					onClick={handleClickSave}
				>
					{t("pag.doc.detail.save")}
				</Button>
				<Box ml={2} />
				<Button onClick={handleClickCancel}>
					{t("pag.doc.detail.cancel")}
				</Button>
			</>}
		>
			<FormParagraph title={t("pag.doc.detail.title_form")}>

				<FormRow label={t("pag.doc.detail.title_field")}>
					<TextField autoFocus fullWidth
						{...titleProp}
						value={doc.select.title}
						onChange={handleChangeTitle}
					/>
				</FormRow>

				<FormRow label={t("pag.doc.detail.desc")}>
					<TextField fullWidth multiline
						value={doc.select.desc}
						onChange={handleChangeDesc}
					/>
				</FormRow>

				<FormRow label={t("pag.doc.detail.link")}>
					<TextField fullWidth
						{...linkProp}
						value={doc.select.link}
						onChange={handleChangeLink}
					/>
				</FormRow>

				<FormRow label={t("pag.doc.detail.author")}>
					<UserWriterSelector
						value={doc.select.author_id}
						onChange={handleChangeAuthor}
					/>
				</FormRow>

			</FormParagraph>
		</Form>)
}

export default DocDetail
