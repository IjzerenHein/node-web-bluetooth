const EventTarget = require('./EventTarget');
const {serviceToUuid, toNobleUuid, fromNobleUuid} = require('./utils');
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

	getCharacteristic(characteristicUuid) {
		return new Promise((resolve, reject) => {
			this._service.discoverCharacteristics(
				[toNobleUuid(characteristicUuid)],
				(error, characteristics) => {
					if (error) {
						reject(error);
					}
					else if (!characteristics.length) {
						reject(new Error('characteristic not found: ' + characteristicUuid));
					}
					else {
						resolve(new BluetoothRemoteGATTCharacteristic(
							characteristics[0],
							this,
							characteristicUuid
						));
					}
				}
			);
		});
	}

	getCharacteristics(characteristicUuid) {
		return new Promise((resolve, reject) => {
			this._service.discoverCharacteristics(
				characteristicUuid ? [toNobleUuid(characteristicUuid)] : undefined,
				(error, characteristics) => {
					if (error) {
						reject(error);
					}
					else {
						resolve(characteristics.map((characteristic) => {
							return new BluetoothRemoteGATTCharacteristic(
								characteristic,
								this,
								fromNobleUuid(characteristic.uuid)
							);
						}));
					}
				}
			);
		});
	}

	getIncludedService(service) {
		return new Promise((resolve, reject) => {
			const uuid = serviceToUuid(service);
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
			this._service.discoverIncludedServices(
				service ? [toNobleUuid(serviceToUuid(service))] : undefined,
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
