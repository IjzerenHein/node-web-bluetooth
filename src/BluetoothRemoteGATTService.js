const EventTarget = require('./EventTarget');
const {serviceToUuid, characteristicToUuid, toNobleUuid, fromNobleUuid} = require('./utils');
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
		this._uuid = service.uuid;
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

	getCharacteristic(characteristic) {
		return new Promise((resolve, reject) => {
			let uuid;
			try {
				uuid = characteristicToUuid(characteristic);
			}
			catch (err) {
				return reject(err);
			}
			this._service.discoverCharacteristics(
				[toNobleUuid(uuid)],
				(error, characteristics) => {
					if (error) {
						reject(error);
					}
					else if (!characteristics.length) {
						reject(new Error('Characteristic "' + characteristic + '" not found'));
					}
					else {
						resolve(new BluetoothRemoteGATTCharacteristic(
							characteristics[0],
							this,
							uuid
						));
					}
				}
			);
		});
	}

	getCharacteristics(characteristic) {
		return new Promise((resolve, reject) => {
			let uuid;
			if (characteristic) {
				try {
					uuid = characteristicToUuid(characteristic);
				}
				catch (err) {
					return reject(err);
				}
			}
			this._service.discoverCharacteristics(
				uuid ? [toNobleUuid(uuid)] : undefined,
				(error, characteristics) => {
					if (error) {
						reject(error);
					}
					else {
						resolve(characteristics.map((char) => {
							return new BluetoothRemoteGATTCharacteristic(
								char,
								this,
								fromNobleUuid(char.uuid)
							);
						}));
					}
				}
			);
		});
	}

	getIncludedService(service) {
		return new Promise((resolve, reject) => {
			let uuid;
			try {
				uuid = serviceToUuid(service);
			}
			catch (err) {
				return reject(err);
			}
			this._service.discoverIncludedServices(
				[toNobleUuid(uuid)],
				(error, services) => {
					if (error) {
						reject(error);
					}
					else {
						const service = new BluetoothRemoteGATTService(
							services[0],
							this.device,
							uuid,
							false
						);
						resolve(service);
					}
				}
			);
		});
	}

	getIncludedServices(service) {
		return new Promise((resolve, reject) => {
			let uuid;
			if (service) {
				try {
					uuid = serviceToUuid(service);
				}
				catch (err) {
					return reject(err);
				}
			}
			this._service.discoverIncludedServices(
				uuid ? [toNobleUuid(uuid)] : undefined,
				(error, services) => {
					if (error) {
						reject(error);
					}
					else {
						resolve(services.map((service) => {
							return new BluetoothRemoteGATTService(
								service,
								this,
								fromNobleUuid(service.uuid),
								false
							);
						}));
					}
				}
			);
		});
	}
}

module.exports = BluetoothRemoteGATTService;
