const EventTarget = require('./EventTarget');
const {fromNobleUuid, uuidToName} = require('./utils');
const BluetoothRemoteGATTServer = require('./BluetoothRemoteGATTServer');

/* events
	[X] gattserverdisconnected
	[ ] serviceadded
	[ ] servicechanged
	[ ] serviceremoved
	[ ] characteristicvaluechanged
*/

class BluetoothDevice extends EventTarget {
	constructor(peripheral) {
		super();
		this._peripheral = peripheral;
		this._uuids = this._peripheral.advertisement.serviceUuids.map(fromNobleUuid);
		this._gatt = new BluetoothRemoteGATTServer(this);
	}

	_updateFromDuplicate(device) {
		if (this._uuids.length > device.uuids.length) return;
		this._peripheral = device._peripheral;
		this._uuids = device._uuids;
	}

	get id() {
		return this._peripheral.id; // this._peripheral.uuid
	}

	get name() {
		return this._peripheral.name || this._peripheral.advertisement.localName;
	}

	get uuids() {
		return this._uuids;
	}

	get gatt() {
		return this._gatt;
	}

	get rssiNonStandard() {
		return this._peripheral.rssi;
	}

	watchAdvertisements() {
		throw new Error('watchAdvertisements is not yet implemented');
	}

	unwatchAdvertisements() {
		throw new Error('unwatchAdvertisements is not yet implemented');
	}

	get watchingAdvertisements() {
		throw new Error('watchingAdvertisements is not yet implemented');
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			uuids: this.uuids,
			rssi: this.rssiNonStandard
		};
	}

	toString() {
		const name = this.name || 'No name';
		const rssi = this.rssiNonStandard + 'dB';
		const services = this.uuids.length ? JSON.stringify(this.uuids.map(uuidToName)) : '[no services advertised]';
		return rssi + ' - ' + name + ' ' + services;
	}
}

module.exports = BluetoothDevice;
