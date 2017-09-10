![node-web-bluetooth logo](./node-web-bluetooth.png)
[![Build Status](https://travis-ci.org/ijzerenhein/node-web-bluetooth.svg?branch=master)](https://travis-ci.org/ijzerenhein/node-web-bluetooth)


web-bluetooth API and interactive device picker for node.js, using the awesome [noble](https://github.com/sandeepmistry/noble) package

# Work in progress, come back later

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



