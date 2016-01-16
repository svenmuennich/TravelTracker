import React from 'react';

import styles from './MapMarker.less';

/**
 * Create instances using e.g. one of the following:
 *
 * <MapMarker lat={59.955413} lng={30.337844} locationIndex={1} />
 * <MapMarker {...this.props.coords} locationIndex={2} />
 *
 * @class MapMarker
 * @extends React.Component
 */
export default class MapMarker extends React.Component {

	/**
	* @returns {JSX}
	*/
	render() {
		// Determine the z-index of this marker and its appearance
		const style = {
		// 	width: '30px',
		// 	height: '50px',
		// 	marginLeft: '-15px',
		// 	marginTop: '-25px',
		// 	background: 'url(http://127.0.0.1:3000/location-marker.svg)',
		// 	backgroundSize: 'cover',
			zIndex: (this.props.$hover) ? 1000 : (this.props.locationIndex + 10)
		};
		//
		// return (
		// 	<div style={style} />
		// );

		return (
			<div className={styles.mapMarker} style={style}>
				<div className={styles.mapMarkerStickShadow} />
				<div className={(this.props.$hover) ? styles.mapMarkerCircleHover : styles.mapMarkerCircle} />
				<div className={(this.props.$hover) ? styles.mapMarkerStickHover : styles.mapMarkerStick} />
			</div>
		);
	}

}

MapMarker.propTypes = {
	lat: React.PropTypes.number.isRequired,
	lng: React.PropTypes.number.isRequired,
	locationIndex: React.PropTypes.number.isRequired
};
