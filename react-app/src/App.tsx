import React from 'react';
import { BrowserRouter, Switch, Route  } from "react-router-dom";
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import Navbar from './components/Navbar/Navbar';
import AddOfferPage from './pages/AddOfferPage/AddOfferPage';
import DataUploadAndDownloadPage from './pages/DataUploadAndDownloadPage/DataUploadAndDownloadPage';
import OffersListingPage from './pages/OffersListingPage/OffersListingPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const IndexFiller: React.FC = () => (
	<>
		<h1>Witamy na stronie giełdy zamian</h1>
		<p>By zapoznać się z aktualnymi ofertami, przejdź do sekcji "Lista ofert"</p>
	</>
);

const NoFoundPageFiller: React.FC = () => (<h1>Tej strony jeszcze nie ma i możliwe, że nie będzie. Amen.</h1>);

const LoadingFiller: React.FC = () => (<h1>Poczekaj...</h1>);

const App: React.FC = () => {
	const initOptions = { pkceMethod: 'S256' };

	const handleOnEvent = async (event: any, error: any) => {
		if (event === 'onAuthSuccess') {
			if (keycloak.authenticated) {
				console.log('Auth!');
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
					<PrivateRoute path={["/offers"]} component={OffersListingPage} />
					<PrivateRoute path={["/myOffers/madeByMe", "/myOffers/acceptedByMe"]} component={NoFoundPageFiller} />
					<PrivateRoute path={["/dataUploadAndDownload"]} component={DataUploadAndDownloadPage} />
					<PrivateRoute path={["/addOffer"]} component={AddOfferPage} />
					<Route exact path="/" component={IndexFiller} />
					<Route path="*" component={NoFoundPageFiller} />
				</Switch>
			</BrowserRouter>
		</ReactKeycloakProvider>
	);
}

export default App;
