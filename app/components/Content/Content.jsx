import React from 'react';
import marked from 'marked';

import styles from './Content.less';
import { fetchLocationContent } from '../../actions';

/**
 * @class Content
 * @extends React.Component
 */
export default class Content extends React.Component {

	/**
	 * @returns {undefined}
	 */
	componentDidMount() {
		this.loadContentIfNeeded(this.props);
	}

	/**
	 * @param {Object} nextProps
	 * @returns {undefined}
	 */
	componentWillReceiveProps(nextProps) {
		this.loadContentIfNeeded(nextProps);
	}

	/**
	 * @param {Object} props
	 * @returns {undefined}
	 */
	loadContentIfNeeded(props) {
		if (props.content === null) {
			const { selectedLocation, dispatch } = props;
			dispatch(fetchLocationContent(selectedLocation));
		}
	}

	/**
	 * @returns {Object}
	 */
	rawMarkup() {
		var rawMarkup = marked((this.props.content || ''), {
			sanitize: true
		});

		return {
			__html: rawMarkup
		};
	}

	/**
	* @returns {JSX}
	*/
	render() {
		// TODO: Add loading animation
		return (
			<div className={styles.content}>
				<div style={{ display: (this.props.isFetching) ? 'block' : 'none' }}>
					LOADING...
				</div>
				<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		);
	}

}

Content.propTypes = {
	selectedLocation: React.PropTypes.number.isRequired,
	content: React.PropTypes.string,
	isFetching: React.PropTypes.bool,
	dispatch: React.PropTypes.func.isRequired
};
