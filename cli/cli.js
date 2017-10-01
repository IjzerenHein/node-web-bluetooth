#!/usr/bin/env node

/* globals process */
const Bluetooth = require('../src/Bluetooth');

const UUID = Object.freeze({
	SERVICE: '00000001-1212-efde-1523-785feabcd124',
	CHARACTERISTIC_TX: '00000002-1212-efde-1523-785feabcd124',
	CHARACTERISTIC_RX: '00000003-1212-efde-1523-785feabcd124'
});

function onDisconnected(event) {
	console.info('gattserverdisconnected');
	event.target.removeEventListener('gattserverdisconnected', onDisconnected);
	// this.state.characteristicRX.removeEventListener('characteristicvaluechanged', this._onCharacteristicValueChanged);
}

function onCharacteristicValueChanged(event) {
	// TODO
}

Bluetooth.requestDevice()
.then(device => {
	device.addEventListener('gattserverdisconnected', onDisconnected);
	console.info('connecting...');
	return device.gatt.connect();
}).then((server) => {
	console.info('connected, getting primary service...');
	return server.getPrimaryService(UUID.SERVICE);
}).then((service) => {
	console.info('service obtained, getting characteristic...');
	return service.getCharacteristic(UUID.CHARACTERISTIC_RX);
/*}).then((characteristic) => {
	console.info('waiting...');
	return new Promise((resolve) => {
		setTimeout(() => resolve(characteristic), 1000);
	});
}).then((characteristic) => {
	console.info('characteristic obtained, writing...');
	const startArion = new Uint8Array([0xFC,0xFD,0x02,0x49,0x00,0x01,0x4C,0xFC,0xFE]);
	return characteristic.writeValue(startArion);
}).then((characteristic) => {*/
}).then(characteristic => {
	console.info('characteristic obtained, starting notifications...');
	characteristic.addEventListener('characteristicvaluechanged', onCharacteristicValueChanged);
	return characteristic.startNotifications();
}).then(characteristic => {
	console.info('notifications started');
	// console.info('ready, disconnecting...');
	// characteristic.service.device.gatt.disconnect();
	process.exit();
}, (error) => {
	console.error('could not connect: ', error.message);
	process.exit(-1);
});
/* }).then(server => {
	return server.getPrimaryService(UUID.SERVICE);
}).then(service => {
	return service.getCharacteristic(UUID.CHARACTERISTIC_RX);
}).then(characteristic => {
	characteristic.addEventListener('characteristicvaluechanged', onCharacteristicValueChanged);
	characteristic.startNotifications();
});*/
