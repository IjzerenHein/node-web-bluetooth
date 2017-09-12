const {toNobleBuffer} = require('./utils');

class BluetoothRemoteGATTDescriptor {
	constructor(descriptor, characteristic, uuid) {
		this._descriptor = descriptor;
		this._characteristic = characteristic;
		this._uuid = uuid;
	}

	get characteristic() {
		return this._characteristic;
	}

	get uuid() {
		return this._uuid;
	}

	get value() {
		return this._value;
	}

	readValue() {
		return new Promise((resolve, reject) => {
			this._descriptor.readValue((error, buffer) => {
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
			this._descriptor.writeValue(toNobleBuffer(value), false, (error) => {
				if (error) {
					reject(error);
				}
				else {
					resolve(this);
				}
			});
		});
	}
}

module.exports = BluetoothRemoteGATTDescriptor;
