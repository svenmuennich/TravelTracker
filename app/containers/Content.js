import { connect } from 'react-redux';

import { getSelectionLocationData } from './Util';
import { default as ContentComponent } from '../components/Content';

/*
 * State
 */
const mapStateToProps = (state) => {
	var location = getSelectionLocationData(state);

	return {
		selectedLocation: state.selectedLocation,
		content: (location && location.content) ? location.content : null,
		isFetching: (location && location.isFetching === true)
	}
};

/*
 * Wrapper
 */
const Content = connect(
	mapStateToProps
)(ContentComponent);

export default Content;
