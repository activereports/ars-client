'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _document = require('./document');

var _document2 = _interopRequireDefault(_document);

var _documentCollection = require('./documentCollection');

var _documentCollection2 = _interopRequireDefault(_documentCollection);

var _mimeType = require('./mimeType');

var _mimeType2 = _interopRequireDefault(_mimeType);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function makeCollection(client, collectionName) {
	var collection = new _documentCollection2.default(client, collectionName);
	var documentFn = function documentFn(id) {
		if (!id) return collection;
		return new _document2.default(client, collectionName, id);
	};

	// extend documentFn with collection API to reduce mistakes
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = Object.getOwnPropertyNames(Object.getPrototypeOf(collection))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var name = _step.value;

			var method = collection[name];
			if (_lodash2.default.isFunction(method)) {
				documentFn[name] = collection[name].bind(collection);
			}
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

	return documentFn;
}

// TODO remove default options
var defaultOptions = {
	token: '$local_admin'
};

var ArsClient = (function () {
	function ArsClient() {
		var options = arguments.length <= 0 || arguments[0] === undefined ? defaultOptions : arguments[0];

		_classCallCheck(this, ArsClient);

		this.options = options;
		this.token = options.token;
		this.reports = makeCollection(this, 'reports');
	}

	_createClass(ArsClient, [{
		key: 'fetchJSON',
		value: function fetchJSON(url) {
			var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

			var opts = _extends({
				headers: {
					AuthToken: this.token,
					Accept: _mimeType2.default.json
				}
			}, options);
			return fetch(url, opts).then(function (response) {
				return response.json();
			});
		}
	}, {
		key: 'delete',
		value: function _delete(url) {
			return this.fetchJSON(url, { method: 'delete' });
		}
	}]);

	return ArsClient;
})();

exports.default = ArsClient;