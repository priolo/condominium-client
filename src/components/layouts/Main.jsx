/* eslint eqeqeq: "off", react-hooks/exhaustive-deps: "off"*/
import React, { lazy, Suspense, useEffect } from "react"
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"

import AppBar from "./AppBar"
import Drawer from "./Drawer"
import Body from "./Body"

import { useLayout } from "../../stores/layout";
import { useAuth } from "../../stores/auth";
import MsgBox from "../app/MsgBox";
import LogIn from "../../pages/auth/LogIn";
import RightDrawer from "./RightDrawer";

const DocDetail = lazy(() => import('../../pages/doc/DocDetail'))
const DocList = lazy(() => import('../../pages/doc/DocList'))
const UserList = lazy(() => import('../../pages/user/UserList'))



export default function Main() {

	const { state: layout } = useLayout()
	const { isLogged, refresh } = useAuth()

	useEffect(() => { refresh() }, [])

	return (
		<ThemeProvider theme={layout.theme}>
			<CssBaseline />
			<MsgBox />
			{ isLogged() ? (
				<Router>
					<AppBar />
					<Drawer />
					<RightDrawer />
					<Body>
						{/* ATTENTION: the order is important */}
						<Switch>

							<Route path={["/docs/:id"]}>
								<Suspense fallback={<h1>Loading....</h1>}>
									<DocDetail />
								</Suspense>
							</Route>

							<Route path={["/docs"]}>
								<Suspense fallback={<h1>Loading....</h1>}>
									<DocList />
								</Suspense>
							</Route>

							<Route path={["/", "/users"]}>
								<Suspense fallback={<h1>Loading....</h1>}>
									<UserList />
								</Suspense>
							</Route>

						</Switch>
					</Body>
				</Router>
			) : (
				<LogIn />
			)}
		</ThemeProvider>
	)
}
