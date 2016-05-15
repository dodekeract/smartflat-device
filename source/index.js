export const OK = 'CONSTANT_OK';
export const NOT_FOUND = 'CONSTANT_NOT_FOUND';
export const DUPLICATE = 'CONSTANT_DUPLICATE';

export default class Device {

	constructor (options) {
		this.options = Object.assign({
			properties: {},
			actions: {}
		}, options);

		this.properties = {};
		this.actions = {};

		for (let id in this.options.properties) {
			this.addProperty(Object.assign({
				id: id,
			}, this.options.properties[id]));
		}
	}

	addProperty (property) {
		if (!this.properties[property.id]) {
			this.properties[property.id] = property;
			return OK;
		} else {
			return DUPLICATE;
		}
	}

	listProperties () {
		return Object.keys(this.properties);
	}

	setProperty (id, value) {
		if (this.properties[id]) {
			this.properties[id].value = value;
			return OK;
		} else {
			return NOT_FOUND;
		}
	}

	getProperty (id) {
		if (this.properties[id]) {
			return this.properties[id].value;
		} else {
			return NOT_FOUND;
		}
	}

	addAction (action) {
		if (!this.actions[action.id]) {
			this.actions[action.id] = action;
			return OK;
		} else {
			return DUPLICATE;
		}
	}

	listActions () {
		return Object.keys(this.actions);
	}

	executeAction (id) {
		if (this.actions[id]) {
			return this.actions[id].run();
		} else {
			return NOT_FOUND;
		}
	}

}
