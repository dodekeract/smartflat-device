import expect from 'expect.js';

import {default as Device, OK, NOT_FOUND, DUPLICATE} from '../build/';

let dev = new Device();

describe('properties', () => {

	it('add', () => {
		expect(
			dev.addProperty({
				id: 'brightness',
				value: 0.5,
				type: 'float'
			})
		).to.be(OK);
	});

	it('add (duplicate)', () => {
		expect(
			dev.addProperty({
				id: 'brightness',
				value: 0.5,
				type: 'float'
			})
		).to.be(DUPLICATE);
	});

	it('list', () => {
		expect(
			dev.listProperties().sort()
		).to.eql(['brightness']);
	});

	it('set', () => {
		expect(
			dev.setProperty('brightness', 0.1337)
		).to.be(OK);
	});

	it('set (not found)', () => {
		expect(
			dev.setProperty('tardis', 42)
		).to.be(NOT_FOUND);
	});

	it('get', () => {
		expect(
			dev.getProperty('brightness')
		).to.be(0.1337);
	});

	it('get (not found)', () => {
		expect(
			dev.getProperty('tardis')
		).to.be(NOT_FOUND);
	});

});

describe('actions', () => {

	it('add', () => {
		expect(
			dev.addAction({
				id: 'toggle',
				run: () => {
					return 'this worked';
				}
			})
		).to.be(OK);
	});

	it('add (duplicate)', () => {
		expect(
			dev.addAction({
				id: 'toggle',
				run: () => {
					return 'this shouldn\'t work';
				}
			})
		).to.be(DUPLICATE);
	});

	it('list', () => {
		expect(
			dev.listActions().sort()
		).to.eql(['toggle']);
	});

	it('execute', () => {
		expect(
			dev.executeAction('toggle')
		).to.be('this worked');
	});

	it('execute (not found)', () => {
		expect(
			dev.executeAction('nonsense')
		).to.be(NOT_FOUND);
	});

});

describe('constants', () => {

	it('ok', () => {
		expect(OK).to.be('CONSTANT_OK');
	});

	it('not found', () => {
		expect(NOT_FOUND).to.be('CONSTANT_NOT_FOUND');
	});

	it('duplicate', () => {
		expect(DUPLICATE).to.be('CONSTANT_DUPLICATE');
	});

});
