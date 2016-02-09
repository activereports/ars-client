'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _upload = require('./upload');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DocumentCollection = (function () {
	function DocumentCollection(client, name) {
		_classCallCheck(this, DocumentCollection);

		this.client = client;
		this.name = name;
	}

	_createClass(DocumentCollection, [{
		key: 'load',
		value: function load() {
			return this.client.fetchJSON('/api/' + this.name);
		}
	}, {
		key: 'scan',
		value: function scan() {
			return this.load();
		}
	}, {
		key: 'upload',
		value: function upload(body) {
			var options = arguments.length <= 1 || arguments[1] === undefined ? _upload.defaultUploadOptions : arguments[1];

			return (0, _upload.postContent)(this.client, 'post', '' + this.name, body, options);
		}
	}]);

	return DocumentCollection;
})();

exports.default = DocumentCollection;