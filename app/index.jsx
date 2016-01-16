import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';
import App from './containers/App';

// Load general CSS (e.g. for rendered markdown)
require('./main.css');

// Create redux store
let store = createStore(rootReducer, {
	selectedLocation: -1,
	locations: [],
	isFetching: false,
	mapCenter: {
		lat: 50.000,
		lng: 8.500
	},
	mapZoom: 9
}, applyMiddleware(
	thunkMiddleware
));

// Create React app
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);
