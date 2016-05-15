'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OK = exports.OK = 'CONSTANT_OK';
var NOT_FOUND = exports.NOT_FOUND = 'CONSTANT_NOT_FOUND';
var DUPLICATE = exports.DUPLICATE = 'CONSTANT_DUPLICATE';

var Device = function () {
	function Device(options) {
		_classCallCheck(this, Device);

		this.options = Object.assign({
			properties: {},
			actions: {}
		}, options);

		this.properties = {};
		this.actions = {};

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = Object.keys(this.options.properties)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var id = _step.value;

				this.addProperty(Object.assign({
					id: id
				}, this.options.properties[id]));
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	}

	_createClass(Device, [{
		key: 'addProperty',
		value: function addProperty(property) {
			return addIfUnique(this, 'properties', property);
		}
	}, {
		key: 'listProperties',
		value: function listProperties() {
			return Object.keys(this.properties);
		}
	}, {
		key: 'setProperty',
		value: function setProperty(id, value) {
			if (this.properties[id]) {
				this.properties[id].value = value;
				return OK;
			} else {
				return NOT_FOUND;
			}
		}
	}, {
		key: 'getProperty',
		value: function getProperty(id) {
			if (this.properties[id]) {
				return this.properties[id].value;
			} else {
				return NOT_FOUND;
			}
		}
	}, {
		key: 'addAction',
		value: function addAction(action) {
			return addIfUnique(this, 'actions', action);
		}
	}, {
		key: 'listActions',
		value: function listActions() {
			return Object.keys(this.actions);
		}
	}, {
		key: 'executeAction',
		value: function executeAction(id) {
			if (this.actions[id]) {
				return this.actions[id].run();
			} else {
				return NOT_FOUND;
			}
		}
	}]);

	return Device;
}();

exports.default = Device;


var addIfUnique = function addIfUnique(that, type, o) {
	if (!that[type][o.id]) {
		that[type][o.id] = o;
		return OK;
	} else {
		return DUPLICATE;
	}
};