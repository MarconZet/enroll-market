import React from 'react';
import { BrowserRouter, Switch, Route  } from "react-router-dom";
import { Provider } from 'react-redux';
import makeStore from './store/store';
import OffersPage from './pages/OffersPage/OffersPage';

const App: React.FC = () => {
  return (
    <Provider store={makeStore()}>
		<BrowserRouter>
			to do
			<Switch>
				<Route path="/offers">
					<OffersPage />
				</Route>
				<Route path="/myOffers/fromMe"></Route>
				<Route path="/myOffers/fromOthers"></Route>
			</Switch>
		</BrowserRouter>
    </Provider>
  );
}

export default App;
