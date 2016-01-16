import { connect } from 'react-redux';

import { default as MapComponent } from '../components/Map';
import { selectLocation, clearMapCenter } from '../actions';

/*
 * State
 */
const mapStateToProps = (state) => {
	return {
		locationCoords: state.locations.map(location => location.coords),
		center: state.mapCenter,
		zoom: state.mapZoom
	}
};

/*
 * Dispatch
 */
const mapDispatchToProps = (dispatch) => {
	return {
		onMarkerClick: (location) => {
			return dispatch(selectLocation(location));
		},
		onMapDrag: () => {
			return dispatch(clearMapCenter());
		}
	}
};

/*
 * Wrapper
 */
const Map = connect(
	mapStateToProps,
	mapDispatchToProps
)(MapComponent);

export default Map;
