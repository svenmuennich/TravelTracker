import 'whatwg-fetch';

/**
 * @param {int} index
 * @returns {Object}
 */
const findLocation = (locations, index) => {
	if (index >= 0 && index < locations.length) {
		return locations[index];
	} else {
		return null;
	}
};

/**
 * @param {Response} response
 * @returns {Promise}
 */
const fetchResponseHandler = (response) => {
	if (response.status >= 200 && response.status < 300) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(new Error(response.statusText));
	}
};

/*
 * UI actions
 */
export const SELECT_LOCATION = 'SELECT_LOCATION';
export function selectLocation(location) {
	return {
		type: SELECT_LOCATION,
		location
	};
}
export const SELECT_PREV_LOCATION = 'SELECT_PREV_LOCATION';
export function selectPrevLocation() {
	return {
		type: SELECT_PREV_LOCATION
	};
}
export const SELECT_NEXT_LOCATION = 'SELECT_NEXT_LOCATION';
export function selectNextLocation() {
	return {
		type: SELECT_NEXT_LOCATION
	};
}
export const CLEAR_MAP_CENTER = 'CLEAR_MAP_CENTER';
export function clearMapCenter() {
	return {
		type: CLEAR_MAP_CENTER
	};
}

/*
 * Fetch location list
 */
export const FETCH_LOCATION_LIST_REQUEST = 'FETCH_LOCATION_LIST_REQUEST';
export function fetchLocationListRequest() {
	return {
		type: FETCH_LOCATION_LIST_REQUEST
	};
}
export const FETCH_LOCATION_LIST_SUCCESS = 'FETCH_LOCATION_LIST_SUCCESS';
export function fetchLocationListSuccess(locations) {
	return {
		type: FETCH_LOCATION_LIST_SUCCESS,
		locations
	};
}
export const FETCH_LOCATION_LIST_FAILURE = 'FETCH_LOCATION_LIST_FAILURE';
export function fetchLocationListFailure(error) {
	return {
		type: FETCH_LOCATION_LIST_FAILURE,
		error
	};
}
export function fetchLocationList() {
	return (dispatch, getState) => {
		if (getState().isFetching) {
			return Promise.resolve();
		}

		// Inform UI about request
		dispatch(fetchLocationListRequest());

		// Load data
		return fetch(`${window.location.href}content/locations.json`)
			.then(response => fetchResponseHandler(response))
			.then(response => response.json())
			.then(json => dispatch(fetchLocationListSuccess(json)))
			.catch(error => dispatch(fetchLocationListFailure(error)));
	};
}

/*
 * Fetch location content
 */
export const FETCH_LOCATION_CONTENT_REQUEST = 'FETCH_LOCATION_CONTENT_REQUEST';
export function fetchLocationContentRequest(location) {
	return {
		type: FETCH_LOCATION_CONTENT_REQUEST,
		location
	};
}
export const FETCH_LOCATION_CONTENT_SUCCESS = 'FETCH_LOCATION_CONTENT_SUCCESS';
export function fetchLocationContentSuccess(location, locationContent) {
	return {
		type: FETCH_LOCATION_CONTENT_SUCCESS,
		location,
		locationContent
	};
}
export const FETCH_LOCATION_CONTENT_FAILURE = 'FETCH_LOCATION_CONTENT_FAILURE';
export function fetchLocationContentFailure(location, error) {
	return {
		type: FETCH_LOCATION_CONTENT_FAILURE,
		location,
		error
	};
}
export function fetchLocationContent(location) {
	return (dispatch, getState) => {
		var locationData = findLocation(getState().locations, location);
		if (!locationData || locationData.isFetching) {
			return Promise.resolve();
		}

		// Inform UI about request
		dispatch(fetchLocationContentRequest(location));

		// Load data
		let contentPath = getState().locations[location].contentPath;
		return fetch(`${window.location.href}${contentPath}`)
			.then(response => fetchResponseHandler(response))
			.then(response => response.text())
			.then(text => dispatch(fetchLocationContentSuccess(location, text)))
			.catch(error => dispatch(fetchLocationContentFailure(location, error)));
	};
}
