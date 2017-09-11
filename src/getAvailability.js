const noble = require('noble');

function getAvailability() {
	if (noble.state !== 'unknown') {
		return Promise.resolve(noble.state === 'poweredOn');
	}
	return new Promise((resolve, reject) => {
		const onStateChange = (state) => {
			if (state !== 'unknown') {
				noble.removeListener('stateChange', onStateChange);
				resolve(state === 'poweredOn');
			}
		};
		noble.on('stateChange', onStateChange);
		setTimeout(() => {
			noble.removeListener('stateChange', onStateChange);
			reject(new Error('Bluetooth state could not be determined'));
		}, 5000);
	});
}

module.exports = getAvailability;
