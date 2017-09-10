class RequestDeviceDelegate {

	constructor() {
		this._promise = new Promise((resolve, reject) => {
			this._resolve = resolve;
			this._reject = reject;
		});
	}

	onStartScan() {
		// override to implment
	}

	onAddDevice(device) {
		// override to implment
	}

	onUpdateDevice(device) {
		// override to implment
	}

	onRemoveDevice(device) {
		// override to implment
	}

	getDevice() {
		return this._promise;
	}

	resolve(device) {
		this._resolve(device);
	}

	reject(error) {
		this._reject(error);
	}
}

module.exports = RequestDeviceDelegate;
