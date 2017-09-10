const EventTarget = require('./EventTarget');
const {toNobleBuffer} = require('./utils');

/* events
	[ ] characteristicvaluechanged
*/

class BluetoothRemoteGATTCharacteristic extends EventTarget {
	constructor(characteristic, service, uuid) {
		super();
		this._characteristic = characteristic;
		this._service = service;
		this._uuid = uuid;
		this._onData = this._onData.bind(this);
		this._characteristic.on('data', this._onData);
	}

	get service() {
		return this._service;
	}

	get uuid() {
		return this._uuid;
	}

	get properties() {
		throw new Error('not yet implemented');
	}

	get value() {
		throw new Error('not yet implemented');
	}

	getDescriptor(descriptorUuid) {
		throw new Error('not yet implemented');
	}

	getDescriptors(descriptorUuid) {
		throw new Error('not yet implemented');
	}

	readValue() {
		throw new Error('not yet implemented');
	}

	writeValue(value) {
		return new Promise((resolve, reject) => {
			this._characteristic.write(toNobleBuffer(value), false, (error) => {
				if (error) {
					reject(error);
				}
				else {
					resolve(this);
				}
			});
		});
	}

	startNotifications() {
		return new Promise((resolve, reject) => {
			this._characteristic.subscribe((error) => {
				if (error) {
					reject(error);
				}
				else {
					resolve(this);
				}
			});
		});
	}

	stopNotifications() {
		return new Promise((resolve, reject) => {
			this._characteristic.unsubscribe((error) => {
				if (error) {
					reject(error);
				}
				else {
					resolve(this);
				}
			});
		});
	}

	_onData(data) {
		console.info('onData: ', data);
	}
}

module.exports = BluetoothRemoteGATTCharacteristic;
