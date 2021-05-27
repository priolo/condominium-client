import { useHistory } from 'react-router';
import Form from '../../components/form/Form';
import { useAuth } from '../../stores/auth';
import { Typography, Button } from '@material-ui/core'




const LoginPage = () => {

	// HOOKs
	const { state: auth, logInGuest } = useAuth()


	// HANDLE
	const handleClickAnonimus =  (e)=> logInGuest()

	// RENDER
	return (
		<Form>
			<Typography>Scegli il tuo login</Typography>
			<Button onClick={handleClickAnonimus}>Anonimous</Button>
		</Form>
	)
}

export default LoginPage;
