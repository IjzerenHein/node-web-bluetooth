const noble = require('noble');
const EventTarget = require('./EventTarget');
const requestDevice = require('./requestDevice');
const RequestDeviceDelegate = require('./RequestDeviceDelegate');
const InteractiveRequestDeviceDelegate = require('./InteractiveRequestDeviceDelegate');
const getAvailability = require('./getAvailability');

const bluetooth = new EventTarget();
noble.on('stateChange', (state) => {
	bluetooth.emit('onavailabilitychanged', state === 'poweredOn');
});

bluetooth.requestDevice = requestDevice;
bluetooth.RequestDeviceDelegate = RequestDeviceDelegate;
bluetooth.InteractiveRequestDeviceDelegate = InteractiveRequestDeviceDelegate;
bluetooth.getAvailability = getAvailability;

global.navigator = {
	...global.navigator,
	bluetooth: bluetooth
};

module.exports = bluetooth;
