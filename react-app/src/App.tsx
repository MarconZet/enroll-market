import React from 'react';
import { BrowserRouter, Switch, Route  } from "react-router-dom";
import { Provider } from 'react-redux';
import makeStore from './store/store';
import OffersListingPage from './pages/OffersListingPage/OffersListingPage';

const App: React.FC = () => {
  return (
    <Provider store={makeStore()}>
		<BrowserRouter>
			to do
			<Switch>
				<Route path="/offers">
					<OffersListingPage />
				</Route>
				<Route path="/myOffers/fromMe"></Route>
				<Route path="/myOffers/fromOthers"></Route>
			</Switch>
		</BrowserRouter>
    </Provider>
  );
}

export default App;
