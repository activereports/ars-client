'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.login = login;

var _urlJoin = require('url-join');

var _urlJoin2 = _interopRequireDefault(_urlJoin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('es6-promise').polyfill();
require('isomorphic-fetch');
function login(user, password) {
	var endpoint = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

	var path = '/api/accounts/login';
	var url = endpoint ? (0, _urlJoin2.default)(endpoint, path) : path;
	return fetch(url, {
		method: 'post',
		body: JSON.stringify({ user: user, password: password })
	}).then(function (r) {
		return r.json();
	}).then(function (p) {
		return p.Token || '';
	});
}