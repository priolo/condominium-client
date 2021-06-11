/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import React, { lazy, Suspense, useEffect } from "react"
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom"

import AppBar from "./components/layouts/AppBar"
import Drawer from "./components/layouts/Drawer"
import Body from "./components/layouts/Body"
import RightDrawer from "./components/layouts/RightDrawer";
import MsgBox from "./components/app/MsgBox";
import LoginPage from "./pages/login/LoginPage";

import { useLayout } from "./stores/layout";
import { usePush } from "./stores/push";
import { useDevice } from "./stores/device";
import { useAuth } from "./stores/auth";

const DocDetail = lazy(() => import('./pages/doc/DocDetail'))
const DocList = lazy(() => import('./pages/doc/DocList'))
const MessageList = lazy(() => import('./pages/message/MessageList'))



const App = () => {

	// HOOKs
	const { state: layout } = useLayout()
	const { state: push, isRegistered, init: initPush } = usePush()
	const { state: device, init: initDevice } = useDevice()
	const { state: auth, isLogged, fetchMe } = useAuth()

	useEffect(() => {
		(async () => {
			try {
				await initPush()
			} catch ( error ) {
				console.error ( error )
				return
			}
			await initDevice()
			fetchMe()
		})()
	}, [initPush, initDevice])



	// RENDER
	return (
		<ThemeProvider theme={layout.theme}>
			<CssBaseline />
			<MsgBox />

			{!isRegistered() ? (

				<div>registration...</div>

			) : isLogged() ? (

				<Router>
					<AppBar />
					<Drawer />
					<RightDrawer />
					<Body>
						{/* ATTENTION: the order is important */}
						<Switch>

							{/* <Route path={["/docs/:id"]}>
								<Suspense fallback={<h1>Loading....</h1>}>
									<DocDetail />
								</Suspense>
							</Route> */}

							{/* <Route path={["/docs"]}>
								<Suspense fallback={<h1>Loading....</h1>}>
									<DocList />
								</Suspense>
							</Route> */}

							<Route path={["/", "/message"]}>
								<Suspense fallback={<h1>Loading....</h1>}>
									<MessageList />
								</Suspense>
							</Route>

						</Switch>
					</Body>
				</Router>

			) : (

				<Router>
					<Switch>
						<Route exact path={["/", "/login"]}>
							<LoginPage />
						</Route>
						{/* <Route exact path="/signme">
							<SignmePage />
						</Route> */}
						<Redirect to="/" />
					</Switch>
				</Router>

			)}

		</ThemeProvider>

	)
}

export default App
