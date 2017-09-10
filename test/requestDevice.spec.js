/* global describe it */
// const {assert} = require('chai');
const {requestDevice} = require('../src');

describe('requestDevice', () => {
	it.skip('Should work :)', async () => {
		const device = await requestDevice();
		return device;
	}).timeout(20000);
});
