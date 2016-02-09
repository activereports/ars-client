'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _document = require('./document');

var _document2 = _interopRequireDefault(_document);

var _report = require('./report');

var _report2 = _interopRequireDefault(_report);

var _datasource = require('./datasource');

var _datasource2 = _interopRequireDefault(_datasource);

var _dataset = require('./dataset');

var _dataset2 = _interopRequireDefault(_dataset);

var _documentCollection = require('./documentCollection');

var _documentCollection2 = _interopRequireDefault(_documentCollection);

var _mimeType = require('./mimeType');

var _mimeType2 = _interopRequireDefault(_mimeType);

var _urlJoin = require('url-join');

var _urlJoin2 = _interopRequireDefault(_urlJoin);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function makeDocument(client, collectionName, id) {
	switch (collectionName.toLowerCase()) {
		case 'reports':
			return new _report2.default(client, id);
		case 'datasources':
			return new _datasource2.default(client, id);
		case 'datasets':
			return new _dataset2.default(client, id);
		default:
			return new _document2.default(client, collectionName, id);
	}
}

function makeCollection(client, collectionName) {
	var collection = new _documentCollection2.default(client, collectionName);
	var documentFn = function documentFn(id) {
		if (!id) return collection;
		return makeDocument(client, collectionName, id);
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
	endpoint: '',
	token: '$local_admin'
};

var ArsClient = (function () {
	function ArsClient() {
		var options = arguments.length <= 0 || arguments[0] === undefined ? defaultOptions : arguments[0];

		_classCallCheck(this, ArsClient);

		this.options = options;
		this.token = options.token;
		this.endpoint = options.endpoint;
		this.agents = makeCollection(this, 'agents');
		this.reports = makeCollection(this, 'reports');
		this.dataSources = makeCollection(this, 'datasources');
		this.dataSets = makeCollection(this, 'datasets');
		this.models = makeCollection(this, 'models');
		this.themes = makeCollection(this, 'themes');
		this.images = makeCollection(this, 'images');
		this.scheduleTemplates = makeCollection(this, 'scheduletemplates');
		this.schedules = makeCollection(this, 'schedules');
		this.styleSheets = makeCollection(this, 'stylesheets');
		this.tags = makeCollection(this, 'tags');
		this.users = makeCollection(this, 'users');
		this.roles = makeCollection(this, 'roles');
	}

	_createClass(ArsClient, [{
		key: 'absurl',
		value: function absurl(url) {
			return this.endpoint ? (0, _urlJoin2.default)(this.endpoint, url) : url;
		}
	}, {
		key: 'fetchJSON',
		value: function fetchJSON(url) {
			var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

			var opts = _extends({
				headers: {
					AuthToken: this.token,
					Accept: _mimeType2.default.json
				}
			}, options);
			return fetch(this.absurl(url), opts).then(function (response) {
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