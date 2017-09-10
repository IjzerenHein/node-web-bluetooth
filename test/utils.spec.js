/* global describe it */
const {assert} = require('chai');
const {
	serviceToUuid,
	toNobleUuid,
	fromNobleUuid,
	uuidToName
} = require('../src/Bluetooth');

describe('utils', () => {
	describe('serviceToUuid', () => {
		it('Should convert valid UUID', () => {
			assert.equal(serviceToUuid('00000001-1212-efde-1523-785feabcd124'), '00000001-1212-efde-1523-785feabcd124');
		});
		it('Should convert standard service "heart_rate"', () => {
			assert.equal(serviceToUuid('heart_rate'), '180d');
		});
		it('Should convert numerical 16-bit service UUID', () => {
			assert.equal(serviceToUuid(0x1802), '1802');
		});
		it('Should throw when invalid standard service is specified', () => {
			assert.throws(() => serviceToUuid('heart_rate_invalid_service'));
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
