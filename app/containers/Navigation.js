import { connect } from 'react-redux';

import { getSelectionLocationData } from './Util';
import { default as NavigationComponent } from '../components/Navigation';
import { selectPrevLocation, selectNextLocation } from '../actions';

/*
 * State
 */
const mapStateToProps = (state) => {
	var location = getSelectionLocationData(state);

	return {
		name: (location) ? `${location.name}, ${location.country}` : '',
		date: (location) ? new Date(location.date) : null,
		selectedLocation: state.selectedLocation,
		locationCount: state.locations.length
	}
};

/*
 * Dispatch
 */
const mapDispatchToProps = (dispatch) => {
	return {
		onPrevClick: () => {
			return dispatch(selectPrevLocation());
		},
		onNextClick: () => {
			return dispatch(selectNextLocation());
		}
	}
};

/*
 * Wrapper
 */
const Navigation = connect(
	mapStateToProps,
	mapDispatchToProps
)(NavigationComponent);

export default Navigation;
