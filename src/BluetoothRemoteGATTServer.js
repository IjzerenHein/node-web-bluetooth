class BluetoothRemoteGATTServer {
	constructor(device) {
		this._device = device;
	}

	get device() {
		return this._device;
	}

	get connected() {
		// todo
		return false;
	}

	connect() {

	}

	disconnect() {

	}

	getPrimaryService(serviceUuid) {

	}

	getPrimaryServices(serviceUuid) {

	}
}

module.exports = BluetoothRemoteGATTServer;
