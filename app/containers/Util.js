/**
 * @param {Object} state
 * @return {Object}
 */
export const getSelectionLocationData = (state) => {
	if (state.selectedLocation >= 0 && state.selectedLocation < state.locations.length) {
		return state.locations[state.selectedLocation];
	}

	return null;
}
