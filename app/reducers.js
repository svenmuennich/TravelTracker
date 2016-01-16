import {
	SELECT_LOCATION, SELECT_PREV_LOCATION, SELECT_NEXT_LOCATION, CLEAR_MAP_CENTER,
	FETCH_LOCATION_LIST_REQUEST, FETCH_LOCATION_LIST_SUCCESS, FETCH_LOCATION_LIST_FAILURE,
	FETCH_LOCATION_CONTENT_REQUEST, FETCH_LOCATION_CONTENT_SUCCESS, FETCH_LOCATION_CONTENT_FAILURE
} from './actions';

/**
 * @param {Object} state
 * @param {Number} selectedLocation
 * @returns {Object}
 */
const reduceSelectedLocation = (state, selectedLocation) => {
	return Object.assign({}, state, {
		selectedLocation: selectedLocation,
		mapCenter: (selectedLocation !== -1) ? state.locations[selectedLocation].coords : state.mapCenter
	});
};

/*
 * Reducer
 */
export default function rootReducer(state, action) {
	switch (action.type) {
		case SELECT_LOCATION:
			return reduceSelectedLocation(state, action.location);
		case SELECT_PREV_LOCATION:
			var newSelectedLocation = -1;
			if (state.locations.length > 0) {
				newSelectedLocation = (state.selectedLocation > 0) ? (state.selectedLocation - 1) : (state.locations.length - 1);
			}
			return reduceSelectedLocation(state, newSelectedLocation);
		case SELECT_NEXT_LOCATION:
			var newSelectedLocation = -1;
			if (state.locations.length > 0) {
				newSelectedLocation = ((state.selectedLocation + 1) < state.locations.length) ? (state.selectedLocation + 1) : 0;
			}
			return reduceSelectedLocation(state, newSelectedLocation);
		case CLEAR_MAP_CENTER:
			return Object.assign({}, state, {
				mapCenter: null
			});
		case FETCH_LOCATION_LIST_REQUEST:
		case FETCH_LOCATION_LIST_SUCCESS:
		case FETCH_LOCATION_LIST_FAILURE:
			var newState = Object.assign({}, state, {
				locations: (action.type === FETCH_LOCATION_LIST_SUCCESS) ? action.locations : state.locations,
				isFetching: (action.type === FETCH_LOCATION_LIST_REQUEST)
			});
			var newSelectedLocation = (action.type === FETCH_LOCATION_LIST_SUCCESS) ? ((action.locations.length > 0) ? (action.locations.length - 1) : -1) : state.selectedLocation;
			return reduceSelectedLocation(newState, newSelectedLocation);
		case FETCH_LOCATION_CONTENT_REQUEST:
		case FETCH_LOCATION_CONTENT_SUCCESS:
		case FETCH_LOCATION_CONTENT_FAILURE:
			return Object.assign({}, state, {
				locations: [
					...state.locations.slice(0, action.location),
					Object.assign({}, state.locations[action.location], {
						content: (action.type === FETCH_LOCATION_CONTENT_SUCCESS) ? action.locationContent : state.locations[action.location].content,
						isFetching: (action.type === FETCH_LOCATION_CONTENT_REQUEST)
					}),
					...state.locations.slice(action.location + 1)
				]
			});
		default:
			return state;
	}
}
