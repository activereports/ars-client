'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _upload = require('./upload');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO GET, PUT, PATCH permissions

var Document = (function () {
	function Document(client, collectionName, id) {
		_classCallCheck(this, Document);

		this.client = client;
		this.collectionName = collectionName;
		this.id = id;
		this.path = collectionName + '/' + this.id;
	}

	_createClass(Document, [{
		key: 'load',
		value: function load() {
			return this.client.fetchJSON('/api/' + this.path);
		}
	}, {
		key: 'delete',
		value: function _delete() {
			return this.client.delete('/api/' + this.path);
		}
	}, {
		key: 'remove',
		value: function remove() {
			return this.delete();
		}
	}, {
		key: 'getContent',
		value: function getContent() {
			return (0, _upload.getContent)(this.client, this.path);
		}
	}, {
		key: 'content',
		value: function content() {
			return this.getContent();
		}
	}, {
		key: 'updateContent',
		value: function updateContent(body) {
			var options = arguments.length <= 1 || arguments[1] === undefined ? _upload.defaultUploadOptions : arguments[1];

			return (0, _upload.postContent)(this.client, 'put', this.path, body, options);
		}
	}]);

	return Document;
})();

exports.default = Document;