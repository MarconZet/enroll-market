import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route  } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import AddOfferPage from './pages/AddOfferPage/AddOfferPage';
import DataUploadAndDownloadPage from './pages/DataUploadAndDownloadPage/DataUploadAndDownloadPage';
import OffersListingPage from './pages/OffersListingPage/OffersListingPage';
import { getGlobalDataRequest } from './store/globalData/actions';

const App: React.FC = () => {
	const dispatch =  useDispatch();

	useEffect(() => {
		dispatch(getGlobalDataRequest());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route path={["/offers"]}>
					<OffersListingPage />
				</Route>
				<Route path={["/myOffers/madeByMe", "/myOffers/acceptedByMe"]}>
					<h1>Ten listing czeka na implementację odpowiedniego filtru. Wróć później.</h1>
				</Route>
				<Route path={["/dataUploadAndDownload"]}>
					<DataUploadAndDownloadPage />
				</Route>
				<Route path={["/addOffer"]}>
					<AddOfferPage />
				</Route>
				<Route exact path="/">
					<h1>Witamy na stronie giełdy zamian</h1>
					<p>By zapoznać się z aktualnymi ofertami, przejdź do sekcji "Lista ofert"</p>
				</Route>
				<Route path="*">
					<h1>Tej strony jeszcze nie ma i możliwe, że nie będzie. Amen.</h1>
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
