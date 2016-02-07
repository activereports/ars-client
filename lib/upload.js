'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.defaultUploadOptions = undefined;
exports.postContent = postContent;
exports.getContent = getContent;

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _mimeType = require('./mimeType');

var _mimeType2 = _interopRequireDefault(_mimeType);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultUploadOptions = exports.defaultUploadOptions = {
	contentType: _mimeType2.default.json
};

function postContent(client, method, path, body) {
	var options = arguments.length <= 4 || arguments[4] === undefined ? defaultUploadOptions : arguments[4];

	var query = _queryString2.default.stringify(_lodash2.default.pick(options, 'name', 'description', 'comment', 'tagId', 'connectionString', 'default', 'temporary', 'overwrite', 'nopatchref', 'novalidation'));
	var url = client.absurl('/api/' + path + '/content?' + query);
	return fetch(url, {
		headers: {
			AuthToken: client.token,
			'Content-Type': options.contentType || _mimeType2.default.json
		},
		method: method || 'post',
		body: _lodash2.default.isObject(body) ? JSON.stringify(body) : body
	});
}

function getContent(client, path) {
	var options = arguments.length <= 2 || arguments[2] === undefined ? defaultUploadOptions : arguments[2];

	var url = client.absurl('/api/' + path + '/content');
	return fetch(url, {
		headers: {
			AuthToken: client.token,
			Accept: options.contentType || _mimeType2.default.json
		}
	}).then(function (response) {
		return response.json();
	});
}