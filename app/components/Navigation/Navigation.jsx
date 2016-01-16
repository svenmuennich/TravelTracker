import React from 'react';
import dateFormat from 'dateformat';
import classNames from 'classnames/bind';

import styles from './Navigation.less';

// Bind styles for conditional class names
let cx = classNames.bind(styles);

/**
 * @class Navigation
 * @extends React.Component
 */
export default class Navigation extends React.Component {

	/**
	* @returns {JSX}
	*/
	render() {
		let disablePrev = this.props.selectedLocation == 0;
		let disableNext = this.props.selectedLocation == (this.props.locationCount - 1);

		return (
			<div className={styles.navigation}>
				<div className={styles.text}>
					<span className={styles.location}>{this.props.name}</span><br />
					<span className={styles.date}>
						{(this.props.date) ? dateFormat(this.props.date.toString(), 'fullDate') : ''}
					</span>
				</div>
				<div className={styles.buttons}>
					<a href="#" className={cx({
						prev: true,
						disabled: disablePrev
					})} onClick={(e) => {
						e.preventDefault();
						if (!disablePrev) {
							this.props.onPrevClick();
						}
					}}></a>
					<a href="#" className={cx({
						next: true,
						disabled: disableNext
					})} onClick={(e) => {
						e.preventDefault();
						if (!disableNext) {
							this.props.onNextClick();
						}
					}}></a>
				</div>
			</div>
		);
	}

}

Navigation.propTypes = {
	name: React.PropTypes.string.isRequired,
	date: React.PropTypes.object,
	selectedLocation: React.PropTypes.number.isRequired,
	locationCount: React.PropTypes.number.isRequired,
	onPrevClick: React.PropTypes.func.isRequired,
	onNextClick: React.PropTypes.func.isRequired
};
