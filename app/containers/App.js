import { connect } from 'react-redux';

import { default as AppComponent } from '../components/App';

/*
 * State
 */
const mapStateToProps = (state) => {
	return {
		isFetching: state.isFetching
	}
};

/*
 * Wrapper
 */
const App = connect(
	mapStateToProps
)(AppComponent);

export default App;
