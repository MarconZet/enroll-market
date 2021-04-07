import React from 'react';
import { BrowserRouter, Switch, Route  } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import OffersListingPage from './pages/OffersListingPage/OffersListingPage';

const App: React.FC = () => {
  return (
	<BrowserRouter>
		<Navbar />
		<Switch>
			<Route path={["/offers", "/myOffers/madeByMe", "/myOffers/acceptedByMe"]}>
				<OffersListingPage />
			</Route>
			<Route path="*">
				<h1>Tej strony nie ma i możliwe, że nie będzie. Amen.</h1>
			</Route>
		</Switch>
	</BrowserRouter>
  );
}

export default App;
