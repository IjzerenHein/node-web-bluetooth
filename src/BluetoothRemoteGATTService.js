const EventTarget = require('./EventTarget');
const {toNobleUuid} = require('./utils');
const BluetoothRemoteGATTCharacteristic = require('./BluetoothRemoteGATTCharacteristic');

/* events
	[ ] serviceadded
	[ ] servicechanged
	[ ] serviceremoved
	[ ] characteristicvaluechanged
*/

class BluetoothRemoteGATTService extends EventTarget {
	constructor(service, device, uuid, isPrimary) {
		super();
		this._service = service;
		this._device = device;
		this._uuid = uuid;
		this._isPrimary = isPrimary;
	}

	get uuid() {
		return this._uuid;
	}

	get isPrimary() {
		return this._isPrimary;
	}

	get device() {
		return this._device;
	}

	getCharacteristic(characteristicUuid) {
		return new Promise((resolve, reject) => {
			this._service.discoverCharacteristics(
				[toNobleUuid(characteristicUuid)],
				(error, characteristics) => {
					if (error) {
						reject(error);
					}
					else {
						const char = new BluetoothRemoteGATTCharacteristic(
							characteristics[0],
							this,
							characteristicUuid
						);
						resolve(char);
					}
				}
			);
		});
	}

	getCharacteristics(characteristicUuid) {
		throw new Error('getCharacteristics is not yet supported');
	}

	getIncludedService(serviceUuid) {
		throw new Error('getIncludedService is not yet supported');
	}

	getIncludedServices(serviceUuid) {
		throw new Error('getIncludedServices is not yet supported');
	}
}

module.exports = BluetoothRemoteGATTService;
