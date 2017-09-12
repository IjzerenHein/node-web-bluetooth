const BluetoothDevice = require('./BluetoothDevice');
const requestDevice = require('./requestDevice');
const RequestDeviceDelegate = require('./RequestDeviceDelegate');
const InteractiveRequestDeviceDelegate = require('./InteractiveRequestDeviceDelegate');
const getAvailability = require('./getAvailability');
const {
	toNobleUuid,
	fromNobleUuid,
	serviceToUuid,
	uuidToName
} = require('./utils');

const Bluetooth = {
	BluetoothDevice,
	requestDevice,
	RequestDeviceDelegate,
	InteractiveRequestDeviceDelegate,
	getAvailability,
	toNobleUuid,
	fromNobleUuid,
	serviceToUuid,
	uuidToName
};

global.navigator = {
	...global.navigator,
	bluetooth: Bluetooth
};

module.exports = Bluetooth;
