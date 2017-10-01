const InteractiveTermList = require('./InteractiveTermList');
const RequestDeviceDelegate = require('./RequestDeviceDelegate');

function formatDevice(device) {
	return device.toString();
}

class InteractiveRequestDeviceDelegate extends RequestDeviceDelegate {
	constructor(options = {}) {
		super();
		this._devices = [];
		this._termList = new InteractiveTermList({
			header: options.header || ('node-web-bluetooth - Pair with device:'.blue.bold),
		});
		this._format = options.format || formatDevice;
		this._onKeyPress = this._onKeyPress.bind(this);
	}

	_onKeyPress(key, id) {
		switch (key.name) {
    case 'return':
			if (this._termList.selected) {
				this._termList.stop();
				const device = this._devices.find((device) => device.id === this._termList.selected);
				this.resolve(device);
			}
			break;
		case 'escape':
			this._termList.stop();
			this.reject(new Error('Esc pressed'));
			break;
    }
	}

	onStartScan() {
		this._termList.on('keypress', this._onKeyPress);
		this._termList.start();
	}

	onAddDevice(device) {
		this._devices.push(device);
		this._termList.add(device.id, this._format(device));
	}

	onUpdateDevice(device) {
		this._termList.update(device.id, this._format(device));
	}

	onRemoveDevice(device) {
		this._termList.remove(device.id);
		this._devices.splice(this._devices.indexOf(device), 1);
	}
}

module.exports = InteractiveRequestDeviceDelegate;
