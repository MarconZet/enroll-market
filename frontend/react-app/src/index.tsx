import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import makeStore from './store/store';
import './index.css';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={makeStore()}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
