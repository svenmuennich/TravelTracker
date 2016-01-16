import React from 'react';
import Point from 'point-geometry';

import SVGComponent from '../SVGComponent';

/**
 * @class MapConnectionMarker
 * @extends React.Component
 */
export default class MapConnectionMarker extends React.Component {

	/**
	* @returns {JSX}
	*/
	render() {
		// Determine the points (x,y) of the start and end locations (relative to the map)
		let p1 = this.props.$geoService.project({
				lat: this.props.lat,
				lng: this.props.lng
			}, true),
			p2 = this.props.$geoService.project(this.props.end, true);

		// Calculate the control point for the path (relative to the map)
		let c = this.controlPoint(p1, p2);

		// Use the (map relative) positions to calculate the size and offset of the SVG component
		let minX = Math.min(p1.x, p2.x, c.x);
		let maxX = Math.max(p1.x, p2.x, c.x);
		let minY = Math.min(p1.y, p2.y, c.y);
		let maxY = Math.max(p1.y, p2.y, c.y);
		let svgStyle = {
			width: (maxX - minX),
			height: (maxY - minY),
			marginLeft: (minX - p1.x),
			marginTop: (minY - p1.y),
			zIndex: -1
		};

		// Calculate the start, end and control points (x,y) relative to the SVG
		let start = new Point(
				(p1.x - minX),
				(p1.y - minY)
			),
			end = new Point(
				(p2.x - minX),
				(p2.y - minY)
			);
		let control = this.controlPoint(start, end);

		const pathStyle = {
			strokeWidth: 2,
			stroke: 'black',
			fill: 'none'
		};

		return (
			<div style={svgStyle}>
				<SVGComponent>
					<path d={`M ${start.x} ${start.y} q ${control.x - start.x} ${control.y - start.y} ${end.x - start.x} ${end.y - start.y}`} {...pathStyle} />
				</SVGComponent>
			</div>
		);
	}

	/**
		<div className={styles.mapConnectionMarker} style={style}>
			<SVGComponent>
				<path d={`M ${start.x} ${start.y} q ${control.x - start.x} ${control.y - start.y} ${end.x - start.x} ${end.y - start.y}`} {...pathStyle} />
				<circle cx={start.x} cy={start.y} r="5" fill="yellow"/>
				<circle cx={end.x} cy={end.y} r="5" fill="yellow"/>
				<circle cx={center.x} cy={center.y} r="5" fill="green"/>
				<circle cx={control.x} cy={control.y} r="5" fill="red"/>
			</SVGComponent>
		</div>
	*/

	controlPoint(p1, p2) {
		// Delta between p1 and p2
		let d = new Point(
			(p2.x - p1.x),
			(p2.y - p1.y)
		);
		// Euclidean distance between p1 and p2
		let l = Math.sqrt(Math.pow(d.x, 2) + Math.pow(d.y, 2));
		// Center point between p1 and p2
		let c = new Point(
			(p1.x + d.x / 2),
			(p1.y + d.y / 2)
		);
		// Orthogonal slope
		let mI = -d.x / d.y;
		// Control point, orthogonal to delta, above center
		const curvature = 0.35;
		let dX = curvature * l * Math.sqrt(1 / ((Math.pow(mI, 2) + 1)));
		let b = new Point(
			(c.x + dX),
			(c.y + mI * dX)
		);

		return b;
	}

}

MapConnectionMarker.propTypes = {
	lat: React.PropTypes.number.isRequired,
	lng: React.PropTypes.number.isRequired,
	end: React.PropTypes.shape({
		lat: React.PropTypes.number.isRequired,
		lng: React.PropTypes.number.isRequired
	}).isRequired
};
