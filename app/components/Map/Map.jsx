import React from 'react';
import GoogleMap from 'google-map-react';

import styles from './Map.less';
import MapMarker from '../MapMarker';
import MapConnectionMarker from '../MapConnectionMarker';

/**
 * @class Map
 * @extends React.Component
 */
export default class Map extends React.Component {

	/**
	 * @param {String} key
	 * @returns {undefined}
	 */
	onChildClick(key) {
		this.props.onMarkerClick(parseInt(key));
	}

	/**
	 * @returns {undefined}
	 */
	onDrag() {
		if (this.props.center) {
			this.props.onMapDrag();
		}
	}

	/**
	 * @param {Object} markerPos
	 * @param {Object} mousePos
	 * @param {Object} markerProps
	 * @returns {Number}
	 */
	calcDistanceToMouse(markerPos, mousePos, markerProps) {
		const x = markerPos.x;
		const y = markerPos.y - 15 - 20 / 2;
		const distance = Math.sqrt((x - mousePos.x) * (x - mousePos.x) + (y - mousePos.y) * (y - mousePos.y));
		// Set penalty for connection markers
		const penalty = (typeof markerProps.locationIndex === 'undefined') ? 1000 : 1;

		return distance * penalty;
	}

	/**
	* @returns {JSX}
	*/
	render() {
		// Prepare the markers
		var markers = [];
		var prevItem = null;
		for (let i = 0; i < this.props.locationCoords.length; i++) {
			var item = this.props.locationCoords[i];
			// Add a connection marker if possible
			if (prevItem) {
				markers.push(
					<MapConnectionMarker {...item} end={prevItem} key={`${i - 1}-${i}`} />
				);
			}
			prevItem = item;

			// Add the location marker
			markers.push(
				<MapMarker {...item} locationIndex={i} key={i} />
			);
		}

		return (
			<div className={styles.map}>
				<GoogleMap
					center={this.props.center}
					zoom={this.props.zoom}
					distanceToMouse={this.calcDistanceToMouse}
					onChildClick={this.onChildClick.bind(this)}
					onDrag={this.onDrag.bind(this)}>
					{markers}
				</GoogleMap>
			</div>
		);
	}

}

Map.propTypes = {
	locationCoords: React.PropTypes.array.isRequired,
	center: React.PropTypes.shape({
		lat: React.PropTypes.number.isRequired,
		lng: React.PropTypes.number.isRequired
	}),
	zoom: React.PropTypes.number.isRequired,
	onMarkerClick: React.PropTypes.func.isRequired,
	onMapDrag: React.PropTypes.func.isRequired
};
