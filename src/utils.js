/* globals Buffer */
const noble = require('noble');
const services = require('noble/lib/services.json');

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

function serviceToUuid(service) {
	if (typeof service === 'number') {
		return service.toString(16);
	}
	else if (service.length === 36) {
		return service;
	}
	const type = 'org.bluetooth.service.' + service;
	for (const key in services) {
		const s = services[key];
		if (s.type === type) return key;
	}
	throw new Error('Unknown service specified: ' + service);
}

function uuidToName(uuid) {
	if (uuid.length !== 4) return uuid;
	uuid = uuid.toLowerCase();
	for (const key in services) {
		if (key === uuid) return services[key].name;
	}
	return uuid;
}

// 00000001-1212-efde-1523-785feabcd124
function fromNobleUuid(uuid) {
	if (uuid.length !== 32) return uuid;
	return (
		uuid.substring(0, 8) +
		'-' +
		uuid.substring(8, 12) +
		'-' +
		uuid.substring(12, 16) +
		'-' +
		uuid.substring(16, 20) +
		'-' +
		uuid.substring(20)
	);
}

function toNobleUuid(uuid) {
	return uuid.replace(/-/g, '');
}

function toNobleBuffer(data) {
	if (data instanceof Buffer) {
		return data;
	}
	else if (data instanceof Uint8Array) {
		return Buffer.from(data.buffer);
	}
	else {
		return Buffer.from(data);
	}
}

module.exports = {
	getAvailability,
	toNobleUuid,
	fromNobleUuid,
	serviceToUuid,
	uuidToName,
	toNobleBuffer
};
