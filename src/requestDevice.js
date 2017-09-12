const noble = require('noble');
const {serviceToUuid, toNobleUuid} = require('./utils');
const getAvailability = require('./getAvailability');
const BluetoothDevice = require('./BluetoothDevice');
const InteractiveRequestDeviceDelegate = require('./InteractiveRequestDeviceDelegate');

function isFilteredDevice({name, uuids}, filter) {
	if (filter.services) {
		const filterUuids = filter.services.map(serviceToUuid);
		for (let i = 0; i < filterUuids.length; i++) {
			if (uuids.indexOf(filterUuids[i]) < 0) {
				return false;
			}
		}
	}
	if (filter.name &&
		(filter.name !== name)) {
		return false;
	}
	if (filter.namePrefix &&
		(filter.namePrefix !== name.substring(0, filter.namePrefix.length))) {
		return false;
	}
	if (filter.manufacturerData) {
		throw new Error('filter.manufacturerData spec is unstable and not yet supported');
	}
	if (filter.serviceData) {
		throw new Error('filter.serviceData spec is unstable and not yet supported');
	}
	return true;
}

/**
 * requestDevice() method of the Bluetooth interface returns a
 * Promise to a BluetoothDevice object with the specified options.
 * If there is no chooser UI, this method returns the first device
 * matching the criteria.
 *
 * @param {object} options - An object that sets options for the device request.
 * @param {Array} options.filters - An array of BluetoothScanFilters. This filter consists of an array of  BluetoothServiceUUIDs, a name parameter, and a namePrefix parameter.
 * @param {Array} options.optionalServices - NOT YET SUPPORTED
 * @param {bool} options.acceptAllDevices - NOT YET SUPPORTED
 * @return {Promise} A Promise to a BluetoothDevice object.
 */
async function requestDevice({ // eslint-disable-line
	filters = [],
	optionalServices,
	acceptAllDevices,
	delegate
} = {}) {
	if (optionalServices) throw new Error('optionalServices is not yet supported');
	if (acceptAllDevices) throw new Error('acceptAllDevices is not yet supported');

	delegate = delegate || new InteractiveRequestDeviceDelegate();

	const serviceUUIDs = [];
	filters.forEach((filter) => {
		if (filter.services) {
			filter.services.forEach((service) => {
				serviceUUIDs.push(toNobleUuid(serviceToUuid(service)));
			});
		}
	});

	const isAvailable = await getAvailability();
	if (!isAvailable) throw new Error('Bluetooth is not enabled/available');

	const devices = [];
	const onDiscover = (peripheral) => {
		const device = new BluetoothDevice(peripheral);
		const filter = filters.find((filter) => isFilteredDevice(device, filter));
		if (!filters.length || filter) {
			const existingDevice = devices.find((d) => device.id === d.id);
			if (existingDevice) {
				existingDevice._updateFromDuplicate(device);
				delegate.onUpdateDevice(existingDevice);
			}
			else {
				devices.push(device);
				delegate.onAddDevice(device);
			}
		}
	};
	noble.on('discover', onDiscover);

	let resultDevice;
	try {
		delegate.onStartScan();
		noble.startScanning(serviceUUIDs, true);
		resultDevice = await delegate.getDevice();
	}
	catch (err) {
		throw err;
	}
	noble.removeListener('discover', onDiscover);
	noble.stopScanning();

	return resultDevice;
}

module.exports = requestDevice;
