import React from 'react';
import { BrowserRouter, Switch, Route  } from "react-router-dom";
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import Navbar from './components/Navbar/Navbar';
import AddOfferPage from './pages/AddOfferPage/AddOfferPage';
import DataUploadAndDownloadPage from './pages/DataUploadAndDownloadPage/DataUploadAndDownloadPage';
import OffersListingPage from './pages/OffersListingPage/OffersListingPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { useDispatch } from 'react-redux';
import { getUserDataRequest } from './store/userAuth/actions';
import UserTimetablePage from "./pages/UserTimetablePage/UserTimetablePage";
import { getGlobalDataRequest } from './store/globalData/actions';
import SwapCoursesPage from './pages/SwapCoursesPage/SwapCoursesPage';
import ReactModal from 'react-modal';
import GlobalTimetablePage from "./pages/GlobalTimetablePage/GlobalTimetablePage";

ReactModal.setAppElement("#root")

const IndexFiller: React.FC = () => (
	<>
		<h1>Witamy na stronie giełdy zamian</h1>
		<p>By zapoznać się z aktualnymi ofertami, przejdź do sekcji "Lista ofert"</p>
	</>
);

const NoFoundPageFiller: React.FC = () => (
	<>
		<h1>404 - Page not found</h1>
		<p>Ups... wygląda na to, że strona, której szukasz nie istnieje</p>
	</>
);

const UnauthorizedFiller: React.FC = () => (<h1>Próbowaleś wejść na stronę bez potrzebnych uprawnień.</h1>);

const LoadingFiller: React.FC = () => (<h1>Poczekaj...</h1>);

const App: React.FC = () => {
	const dispatch = useDispatch();

	const initOptions = { pkceMethod: 'S256' };

	const handleOnEvent = async (event: any, error: any) => {
		if (event === 'onAuthSuccess') {
			if (keycloak.authenticated && typeof keycloak?.token !== 'undefined') {
				dispatch(getGlobalDataRequest());
				dispatch(getUserDataRequest());
			}
		}
	  }

	return (
		<ReactKeycloakProvider
			authClient={keycloak}
			initOptions={initOptions}
			LoadingComponent={<LoadingFiller />}
			onEvent={handleOnEvent}
		>
			<BrowserRouter>
				<Navbar />
				<Switch>
					<PrivateRoute path={["/offers", "/myOffers/active", "/myOffers/realised"]} component={OffersListingPage} />
					<PrivateRoute path={["/dataUploadAndDownload"]} component={DataUploadAndDownloadPage} isAdminRoute />
					<PrivateRoute path={["/addOffer"]} component={AddOfferPage} />
					<PrivateRoute path={["/swapCourses"]} component={SwapCoursesPage} />
					<PrivateRoute path={["/userTimetable"]} component={UserTimetablePage} />
					<PrivateRoute path={["/globalTimetable"]} component={GlobalTimetablePage} />
					<Route exact path="/" component={IndexFiller} />
					<Route exact path="/unauthorized" component={UnauthorizedFiller} />
					<Route path="*" component={NoFoundPageFiller} />
				</Switch>
			</BrowserRouter>
		</ReactKeycloakProvider>
	);
}

export default App;
