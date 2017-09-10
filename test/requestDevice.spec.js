/* global describe it */
// import {assert} from 'chai';
import {requestDevice} from '../src';

describe('requestDevice', () => {
	it('Should work :)', async () => {
		const device = await requestDevice();
		return device;
	}).timeout(20000);
});
