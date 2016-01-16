import React from 'react';

import styles from './App.less';
import Navigation from '../../containers/Navigation';
import Content from '../../containers/Content';
import Map from '../../containers/Map';
import { fetchLocationList } from '../../actions';

/**
 * @class App
 * @extends React.Component
 */
export default class App extends React.Component {

	/**
	 * @returns {undefined}
	 */
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchLocationList());
	}

	/**
	* @returns {JSX}
	*/
	render() {
		// TODO: Add loading animation
		return (
			<div className={styles.app}>
				<Navigation />
				<Content />
				<Map />
			</div>
		);
	}

}

App.propTypes = {
	isFetching: React.PropTypes.bool.isRequired,
	dispatch: React.PropTypes.func.isRequired
};
