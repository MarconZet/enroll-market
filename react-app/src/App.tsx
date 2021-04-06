import React from 'react';
import { BrowserRouter, Switch, Route  } from "react-router-dom";
import OffersListingPage from './pages/OffersListingPage/OffersListingPage';

const App: React.FC = () => {
  return (
	<BrowserRouter>
		to do
		<Switch>
			<Route path={["/offers", "/myOffers/madeByMe", "/myOffers/acceptedByMe"]}>
				<OffersListingPage />
			</Route>
		</Switch>
	</BrowserRouter>
  );
}

export default App;
