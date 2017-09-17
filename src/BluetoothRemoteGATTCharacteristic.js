const EventTarget = require('./EventTarget');
const {descriptorToUuid, toNobleBuffer, fromNobleUuid} = require('./utils');
const BluetoothRemoteGATTDescriptor = require('./BluetoothRemoteGATTDescriptor');

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
		return this._service.properties;
	}

	get value() {
		return this._value;
	}

	getDescriptor(descriptor) {
		return new Promise((resolve, reject) => {
			let uuid; // eslint-disable-line
			try {
				uuid = descriptorToUuid(descriptor);
			}
			catch (err) {
				return reject(err);
			}
			this._characteristic.discoverDescriptors(
				(error, descriptors) => {
					if (error) {
						reject(error);
					}
					else if (!descriptors.length) {
						reject(new Error('no descriptors found'));
					}
					else {
						// TODO filter on uuid
						resolve(new BluetoothRemoteGATTDescriptor(
							descriptors[0],
							this,
							fromNobleUuid(descriptors[0].uuid)
						));
					}
				}
			);
		});
	}

	getDescriptors(descriptor) {
		return new Promise((resolve, reject) => {
			let uuid; // eslint-disable-line
			if (descriptor) {
				try {
					uuid = descriptorToUuid(descriptor);
				}
				catch (err) {
					return reject(err);
				}
			}
			this._characteristic.discoverDescriptors(
				(error, descriptors) => {
					if (error) {
						reject(error);
					}
					else {
						resolve(descriptors.map((descriptor) => {
							return new BluetoothRemoteGATTDescriptor(
								descriptor,
								this,
								fromNobleUuid(descriptor.uuid)
							);
						}));
					}
				}
			);
		});
	}

	readValue() {
		return new Promise((resolve, reject) => {
			this._characteristic.read((error, buffer) => {
				if (error) {
					reject(error);
				}
				else {
					this._value = new DataView(buffer.buffer);
					resolve(this._value);
				}
			});
		});
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

	_onData(buffer) {
		this._value = new DataView(buffer.buffer);
		this.emit('characteristicvaluechanged', {
			target: this
		});
	}
}

module.exports = BluetoothRemoteGATTCharacteristic;
