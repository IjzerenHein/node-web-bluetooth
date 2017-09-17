/* global describe it */
const {assert} = require('chai');
const {
	serviceToUuid,
	characteristicToUuid,
	descriptorToUuid,
	toNobleUuid,
	fromNobleUuid,
	uuidToName
} = require('../src/utils');

describe('utils', () => {
	describe('serviceToUuid', () => {
		it('Should convert valid UUID', () => {
			assert.equal(serviceToUuid('00000001-1212-efde-1523-785feabcd124'), '00000001-1212-efde-1523-785feabcd124');
		});
		it('Should convert standard service "heart_rate"', () => {
			assert.equal(serviceToUuid('heart_rate'), '180d');
		});
		it('Should convert numerical 16-bit UUID', () => {
			assert.equal(serviceToUuid(0x1802), '1802');
		});
		it('Should throw when invalid standard service is specified', () => {
			assert.throws(() => serviceToUuid('heart_rate_invalid_service'));
		});
	});

	describe('characteristicToUuid', () => {
		it('Should convert valid UUID', () => {
			assert.equal(characteristicToUuid('00000001-1212-efde-1523-785feabcd124'), '00000001-1212-efde-1523-785feabcd124');
		});
		it('Should convert standard characteristic "heart_rate_measurement"', () => {
			assert.equal(characteristicToUuid('heart_rate_measurement'), '2a37');
		});
		it('Should convert numerical 16-bit UUID', () => {
			assert.equal(characteristicToUuid(0x2a37), '2a37');
		});
		it('Should throw when invalid standard characteristic is specified', () => {
			assert.throws(() => characteristicToUuid('heart_rate_invalid_characteristic'));
		});
	});

	describe('descriptorToUuid', () => {
		it('Should convert valid UUID', () => {
			assert.equal(descriptorToUuid('00000001-1212-efde-1523-785feabcd124'), '00000001-1212-efde-1523-785feabcd124');
		});
		it('Should convert standard descriptor "environmental_sensing_measurement"', () => {
			assert.equal(descriptorToUuid('environmental_sensing_measurement'), '290c');
		});
		it('Should convert numerical 16-bit UUID', () => {
			assert.equal(descriptorToUuid(0x290c), '290c');
		});
		it('Should throw when invalid standard descriptor is specified', () => {
			assert.throws(() => descriptorToUuid('environmental_invalid_descriptor'));
		});
	});

	describe('toNobleUuid', () => {
		it('Should remove dashes from UUID', () => {
			assert.equal(toNobleUuid('00000001-1212-efde-1523-785feabcd124'), '000000011212efde1523785feabcd124');
		});
		it('Should work with 16 bit UUIDs', () => {
			assert.equal(toNobleUuid('121A'), '121A');
		});
	});

	describe('fromNobleUuid', () => {
		it('Should add dashes to UUID', () => {
			assert.equal(fromNobleUuid('000000011212efde1523785feabcd124'), '00000001-1212-efde-1523-785feabcd124');
		});
		it('Should work with 16 bit UUIDs', () => {
			assert.equal(fromNobleUuid('121A'), '121A');
		});
	});

	describe('uuidToName', () => {
		it('Should convert 16 bit UUID to name', () => {
			assert.equal(uuidToName('180d'), 'Heart Rate');
		});
		it('Should not convert unknown 16 bit UUID to name', () => {
			assert.equal(uuidToName('cb00'), 'cb00');
		});
		it('Should not convert full UUID to name', () => {
			assert.equal(uuidToName('00000001-1212-efde-1523-785feabcd124'), '00000001-1212-efde-1523-785feabcd124');
		});
	});
});
