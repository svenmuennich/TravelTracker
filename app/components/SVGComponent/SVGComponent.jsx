import React from 'react';

/**
 * @class SVGComponent
 * @extends React.Component
 */
export default class SVGComponent extends React.Component {

	/**
	* @returns {JSX}
	*/
	render() {
		return (
			<svg {...this.props} version="1.1" xmlns="http://www.w3.org/2000/svg">
				{this.props.children}
			</svg>
		);
	}

}

SVGComponent.propTypes = {
	width: React.PropTypes.oneOfType([
		React.PropTypes.number,
		React.PropTypes.string
	]).isRequired,
	height: React.PropTypes.oneOfType([
		React.PropTypes.number,
		React.PropTypes.string
	]).isRequired
};

SVGComponent.defaultProps = {
	width: '100%',
	height: '100%'
};
