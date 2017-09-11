![node-web-bluetooth logo](./node-web-bluetooth.png)
[![Build Status](https://travis-ci.org/ijzerenhein/node-web-bluetooth.svg?branch=master)](https://travis-ci.org/ijzerenhein/node-web-bluetooth)


web-bluetooth API and interactive device picker for node.js, using the awesome [noble](https://github.com/sandeepmistry/noble) package

# Work in progress, come back later

- [ ] Bluetooth.referringDevice
- [x] Bluetooth.getAvailability()
- [x] Bluetooth.requestDevice()
- [ ] Bluetooth.onavailabilitychanged
- [x] BluetoothDevice.id
- [x] BluetoothDevice.name
- [x] BluetoothDevice.gatt
- [x] BluetoothDevice.uuids
- [ ] BluetoothDevice.watchAdvertisements()
- [ ] BluetoothDevice.gattserverdisconnected
- [ ] BluetoothDevice.serviceadded
- [ ] BluetoothDevice.servicechanged
- [ ] BluetoothDevice.serviceremoved
- [ ] BluetoothDevice.characteristicvaluechanged
- [x] BluetoothRemoteGATTServer.device
- [x] BluetoothRemoteGATTServer.connected
- [x] BluetoothRemoteGATTServer.connect()
- [x] BluetoothRemoteGATTServer.disconnect()
- [x] BluetoothRemoteGATTServer.getPrimaryService()
- [ ] BluetoothRemoteGATTServer.getPrimaryServices()
- [x] BluetoothRemoteGATTService.uuid
- [ ] BluetoothRemoteGATTService.isPrimary
- [x] BluetoothRemoteGATTService.device
- [x] BluetoothRemoteGATTService.getCharacteristic()
- [ ] BluetoothRemoteGATTService.getCharacteristics()
- [ ] BluetoothRemoteGATTService.getIncludedService()
- [ ] BluetoothRemoteGATTService.getIncludedServices()
- [x] BluetoothRemoteGATTCharacteristic.service
- [x] BluetoothRemoteGATTCharacteristic.uuid
- [ ] BluetoothRemoteGATTCharacteristic.properties
- [ ] BluetoothRemoteGATTCharacteristic.value
- [ ] BluetoothRemoteGATTCharacteristic.getDescriptor()
- [ ] BluetoothRemoteGATTCharacteristic.getDescriptors()
- [ ] BluetoothRemoteGATTCharacteristic.readValue()
- [x] BluetoothRemoteGATTCharacteristic.writeValue()
- [x] BluetoothRemoteGATTCharacteristic.startNotifications()
- [x] BluetoothRemoteGATTCharacteristic.stopNotifications()
- [x] BluetoothRemoteGATTCharacteristic.characteristicvaluechanged
- [ ] BluetoothRemoteGATTDescriptor.characteristic
- [ ] BluetoothRemoteGATTDescriptor.uuid
- [ ] BluetoothRemoteGATTDescriptor.value
- [ ] BluetoothRemoteGATTDescriptor.readValue
- [ ] BluetoothRemoteGATTDescriptor.writeValue

## Installation

	npm install node-web-bluetooth
	
This will automatically install [noble](https://github.com/sandeepmistry/noble). Depending on your system environment and the tools installed, nobble may or may not work out of the box. Please visit [https://github.com/sandeepmistry/noble](https://github.com/sandeepmistry/noble) on how to install all the prerequisites for noble.

## Usage

	const Bluetooth	= require('node-web-bluetooth');
	
	const promise = Bluetooth.requestDevice({
		filters: [
			{services: ['heart_rate']}
		]
	});

![node-web-bluetooth-request-device](./node-web-bluetooth-request-device.gif)
	
	
Work in progress...



