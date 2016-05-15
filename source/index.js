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

		for (let id of Object.keys(this.options.properties)) {
			this.addProperty(Object.assign({
				id: id
			}, this.options.properties[id]));
		}
	}

	addProperty (property) {
		return addIfUnique(this, 'properties', property);
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
		return addIfUnique(this, 'actions', action);
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

const addIfUnique = (that, type, o) => {
	if (!that[type][o.id]) {
		that[type][o.id] = o;
		return OK;
	} else {
		return DUPLICATE;
	}
}
