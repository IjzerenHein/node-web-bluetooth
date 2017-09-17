/* globals Buffer */
const services = require('noble/lib/services.json');
const characteristics = require('noble/lib/characteristics.json');
const descriptors = require('noble/lib/descriptors.json');

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

function characteristicToUuid(characteristic) {
	if (typeof characteristic === 'number') {
		return characteristic.toString(16);
	}
	else if (characteristic.length === 36) {
		return characteristic;
	}
	const type = 'org.bluetooth.characteristic.' + characteristic;
	for (const key in characteristics) {
		const c = characteristics[key];
		if (c.type === type) return key;
	}
	throw new Error('Unknown characteristic specified: ' + characteristic);
}

function descriptorToUuid(descriptor) {
	if (typeof descriptor === 'number') {
		return descriptor.toString(16);
	}
	else if (descriptor.length === 36) {
		return descriptor;
	}
	const type = 'org.bluetooth.descriptor.' + descriptor;
	for (const key in descriptors) {
		const d = descriptors[key];
		if (d.type === type) return key;
	}
	throw new Error('Unknown descriptor specified: ' + descriptor);
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
	toNobleUuid,
	fromNobleUuid,
	serviceToUuid,
	characteristicToUuid,
	descriptorToUuid,
	uuidToName,
	toNobleBuffer
};
