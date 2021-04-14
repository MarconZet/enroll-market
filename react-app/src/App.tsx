import React from 'react';
import { BrowserRouter, Switch, Route  } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import DataUploadAndDownloadPage from './pages/DataUploadAndDownloadPage/DataUploadAndDownloadPage';
import OffersListingPage from './pages/OffersListingPage/OffersListingPage';

const App: React.FC = () => {
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
			<Route path="*">
				<h1>Tej strony nie ma i możliwe, że nie będzie. Amen.</h1>
			</Route>
		</Switch>
	</BrowserRouter>
  );
}

export default App;
