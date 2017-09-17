const {serviceToUuid, toNobleUuid, fromNobleUuid} = require('./utils');
const BluetoothRemoteGATTService = require('./BluetoothRemoteGATTService');

class BluetoothRemoteGATTServer {
	constructor(device) {
		this._device = device;
		this._connected = false;
	}

	get device() {
		return this._device;
	}

	get connected() {
		return this._connected;
	}

	connect() {
		return new Promise((resolve, reject) => {
			this._device._peripheral.connect((error) => {
				if (error) {
					reject(error);
				}
				else {
					this._connected = true;
					this._device._peripheral.once('disconnect', () => {
						this._connected = false;
						this._device.emit('gattserverdisconnected', {
							target: this._device
						});
					});
					resolve(this);
				}
			});
		});
	}

	disconnect() {
		this._device._peripheral.disconnect();
	}

	getPrimaryService(service) {
		return new Promise((resolve, reject) => {
			let uuid;
			try {
				uuid = serviceToUuid(service);
			}
			catch (err) {
				return reject(err);
			}
			this._device._peripheral.discoverServices(
				[toNobleUuid(uuid)],
				(error, services) => {
					if (error) {
						reject(error);
					}
					else if (!services.length) {
						reject(new Error('Service "' + service + '" not found'));
					}
					else {
						const service = new BluetoothRemoteGATTService(
							services[0],
							this.device,
							uuid,
							true
						);
						resolve(service);
					}
				}
			);
		});
	}

	getPrimaryServices(service) {
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
			this._device._peripheral.discoverServices(
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
								true
							);
						}));
					}
				}
			);
		});
	}
}

module.exports = BluetoothRemoteGATTServer;
