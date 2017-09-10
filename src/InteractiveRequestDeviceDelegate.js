const InteractiveTermList = require('./InteractiveTermList');
const RequestDeviceDelegate = require('./RequestDeviceDelegate');

class InteractiveRequestDeviceDelegate extends RequestDeviceDelegate {
	constructor(options = {}) {
		super();
		this._devices = [];
		this._termList = new InteractiveTermList({
			header: options.header || ('node-web-bluetooth - Pair with device:'.blue.bold)
		});
	}

	_onKeyPress = (key, id) => {
		switch (key.name) {
    case 'return':
			if (this._termList.selected) {
				const device = this._devices.find((device) => device.id === this._termList.selected);
				this.resolve(device);
			}
			break;
		case 'escape':
			this.reject(new Error('Esc pressed'));
			break;
    }
	};

	onStartScan() {
		this._termList.on('keypress', this._onKeyPress);
		this._termList.start();
	}

	onAddDevice(device) {
		this._devices.push(device);
		this._termList.add(device.id, device.toString());
	}

	onUpdateDevice(device) {
		this._termList.update(device.id, device.toString());
	}

	onRemoveDevice(device) {
		this._termList.remove(device.id);
		this._devices.splice(this._devices.indexOf(device), 1);
	}
}

module.exports = InteractiveRequestDeviceDelegate;
